pipeline {

    agent any

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
                sh 'docker build -t url-shortener:test .'
            }
        }

    }

}