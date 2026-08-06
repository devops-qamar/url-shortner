pipeline {

    agent any

    environment {
        IMAGE_NAME = "qamardev/shortener_repo:${BUILD_NUMBER}"
        AWS_PAGER = ""
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
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME .
                '''
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
                sh '''
                docker push $IMAGE_NAME
                '''
            }
        }

        stage('Deploy to Amazon EKS') {
            steps {
                sh '''
                kubectl set image deployment/url-shortener \
                url-shortener=$IMAGE_NAME

                kubectl rollout status deployment/url-shortener
                '''
            }
        }

    }

    post {

        success {
            echo '======================================='
            echo 'Pipeline completed successfully!'
            echo 'Application deployed to Amazon EKS'
            echo '======================================='
        }

        failure {
            echo '======================================='
            echo 'Pipeline failed!'
            echo '======================================='
        }

    }

}
