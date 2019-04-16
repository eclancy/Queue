#!/usr/bin/env groovy

pipeline {

    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                // Build the image.
                script {
                    image = docker.build("jftanner/eclancy")
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        image.push('latest')
                    }
                    sh 'ssh docker.tanndev.com rm -rf eclancy'
                    sh 'ssh docker.tanndev.com mkdir eclancy'
                    sh 'scp docker-compose.yml docker.tanndev.com:eclancy/'
                    sh 'ssh docker.tanndev.com "cd eclancy && docker-compose pull app"'
                    sh 'ssh docker.tanndev.com "cd eclancy && docker-compose up -d"'
                }
                slackSend channel: '@ericlclancy', color: 'good', message: 'Successfully published <https://eclancy.tanndev.com|your website>.'
            }
        }
    }

    post {
        failure {
            slackSend channel: '@ericlclancy', color: 'danger', message: "Failed to build/publish your website. (<${env.JOB_URL}|Pipeline>) (<${env.BUILD_URL}console|Console>)"
        }
    }
}
