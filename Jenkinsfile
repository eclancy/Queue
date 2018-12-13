#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

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
                    sh 'ssh docker.tanndev.com rm -f eclancy-compose.yml'
                    sh 'scp docker-compose.yml docker.tanndev.com:eclancy-compose.yml'
                    sh 'ssh docker.tanndev.com docker-compose -f eclancy-compose.yml pull app'
                    sh 'ssh docker.tanndev.com docker-compose -f eclancy-compose.yml up -d'
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
