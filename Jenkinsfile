/*
 * Copyright (c) 2018 James Tanner
 */

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
                sh 'npm install'
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                script {
                    transfers = [
                            sshTransfer(remoteDirectory: 'eclancy', cleanRemote: true, sourceFiles: '**', execCommand: 'cd eclancy && docker-compose up --build -d')
                    ]
                }
                sshPublisher(failOnError: true, publishers: [sshPublisherDesc(configName: 'Tanndev Docker', transfers: transfers)])
                slackSend channel: '@ericlclancy', color: 'good', message: 'Successfully built <https://eclancy.tanndev.com|your website>.'
            }
        }
    }

    post {
        failure {
            slackSend channel: '@ericlclancy', color: 'danger', message: "Failed to build your website. (<${env.JOB_URL}|Pipeline>) (<${env.BUILD_URL}console|Console>)"
        }
    }
}
