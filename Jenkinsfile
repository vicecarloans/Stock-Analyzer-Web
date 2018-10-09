pipeline {
    agent {
        docker {
            image 'node:8.12.0-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
          node{
            try{
            steps {
                sh """
                  pwd
                  yarn install
                  yarn run build
                  """ 
            }
            }catch(e){
              slackSend(color: "FF9FA1", "FAILED: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)") 
              throw e;
            }
            slackSend(color: "BDFFC3", "SUCCESS: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)") 
          }
          
        }
    }
}