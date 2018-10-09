pipeline {
    agent {
        docker {
            image 'node:8.12.0-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        state('Build') {
          steps {
            sh """
              pwd
              yarn install
              yarn run build
            """
          }
          post {
            success {
              slackSend(color: "FF9FA1", "SUCCESS: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)") 
            }
            failure {
              slackSend(color: "FF9FA1", "FAILED: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)") 
            }
          }
        }
    }
}