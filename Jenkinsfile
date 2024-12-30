pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/username/repository.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
                // Add build commands, e.g., Maven, Gradle, npm, etc.
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add testing commands
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Add deployment steps
            }
        }
    }
}
