pipeline {

    agent any

    environment {
        IMAGE_NAME = "qamardev/shortener_repo:v4"
    }

    stages {

        stage('Clone Verification') {
            steps {
                echo 'Pipeline Started'
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('System Information') {
            steps {
                sh 'whoami'
                sh 'hostname'
                sh 'date'
            }
        }

        stage('Docker Check') {
            steps {
                sh 'docker --version'
                sh 'docker ps'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Verify Node Application') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'cat package.json'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $IMAGE_NAME'
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }

}