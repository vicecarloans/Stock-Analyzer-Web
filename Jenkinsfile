
pipeline {
    agent {
        docker {
            image 'node:8.12.0-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh """
                  pwd
                  yarn install
                  yarn run build
                  """ 
            }
        }
        stage('Post build') {
          steps {
                sh """
                  docker rm $(docker ps -aq)
                  """ 
            }
        }
    }
    post {
      success {
        slackSend(color: "FF9FA1", message: "SUCCESS: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)") 
      }
      failure {
        slackSend(color: "FF9FA1", message: "FAILED: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)") 
      }
    }
}
