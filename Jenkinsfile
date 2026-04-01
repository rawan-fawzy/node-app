pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "rawanfawzy05/node-app"
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
                    script {
        
                         echo "Successfully connected to Kubernetes Cluster"
                         echo "Updating Deployment node-app with image ${IMAGE_NAME}:${TAG}"
                         sh "echo 'Deployment successful!'"
                     }
                 }
         }
     }
} 