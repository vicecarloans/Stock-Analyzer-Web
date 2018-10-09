def label = "jenkins-pod-${UUID.randomUUID().toString()}"
podTemplate(label:label, containers: [
  containerTemplate(name: 'node', image: 'node:8.11.3-alpine', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true)
])

{
  node(label) {
    try {
      def myRepo = checkout scm
      def gitCommit = myRepo.GIT_COMMIT
      def gitBranch = myRepo.GIT_BRANCH
      def shortGitCommit = "${gitCommit[0..10]}"
      def previousGitCommit = sh(script: "git rev-parse ${gitCommit}~", returnStdout: true)
      def commiterName = sh(script: " git show -s --pretty=%an~", returnStdout: true)
      def commiterEmail = sh(script: " git show -s --pretty=%ae~", returnStdout: true)

      stage('Build') {
        container('node') {
          sh """
              pwd
              yarn install
              yarn run build
              """
        }
      }
    }
    catch(e) {
      def msg = "FAILED: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)"
      slackSend(color: "FF9FA1", message:msg) 
      throw e;
    }
    def msg = "SUCESS: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${env.BUILD_URL}|Open>)"
    slackSend(color: "BDFFC3", message:msg) 
  }
}
