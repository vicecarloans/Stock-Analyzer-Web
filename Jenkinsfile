pipeline {
    agent {
        docker {
            image 'node:8.12.0-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
          try{
            steps {
                sh """
                  pwd
                  yarn install
                  yarn run build
                  """ 
            }
          }catch(e){
            def msg = "FAILED: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)"
            slackSend(color: "FF9FA1", message:msg) 
            throw e;
          }
          def msg = "SUCESS: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)"
          slackSend(color: "BDFFC3", message:msg) 
        }
    }
}