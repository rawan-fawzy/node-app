pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "rawan-fawzy/node-app"
        TAG = "${BUILD_NUMBER}"
    }
    stages {
 
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/rawan-fawzy/node-app.git'
            }
        }
 
        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$TAG .'
            }
        }
 
       stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $IMAGE_NAME:$TAG
                    '''
                }
            }
        }
 
        stage('Deploy to K8s') {
            steps {
                sh '''
                kubectl set image deployment/node-app node-app=$IMAGE_NAME:$TAG
                '''
            }
        }
    }
}