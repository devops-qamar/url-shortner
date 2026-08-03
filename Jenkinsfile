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

    }

}
