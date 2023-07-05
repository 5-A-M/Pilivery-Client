pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS') // set timeout 1 hour
    }
    environment {
        TIME_ZONE = 'Asia/Seoul'
        PROFILE = 'local'

        GIT_ACCOUNT = credentials('GIT_ACCOUNT')
        BRANCH = 'main'
        AWS_ARN = "${env.AWS_ARN}"
    }
    tools {
        nodejs "node18"
        git "git"
    }
    stages {
        stage('prepare') {
            steps {
                echo 'prepare'
                git branch: "${BRANCH}", credentialsId: "${GIT_ACCOUNT}", url: 'https://github.com/5-A-M/Pilivery-Client.git'
                sh 'ls'
            }
        }
        stage('clone secret file') {
            steps {
                withCredentials([file(credentialsId: 'FrontEnv', variable: 'secretFile')]) {
                    sh 'chown -R root:5am /var/lib/jenkins/workspace/Front/'
                    sh "pwd /var/lib/jenkins/workspace/Front/"
                    dir('./src/main/resources') {
                        sh "cp ${secretFile} /var/lib/jenkins/workspace/Front/"
                    }
                }
            }
        }
        stage('build') {
            steps {
                dir('/var/lib/jenkins/workspace/Front'){
                    sh "ls"
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }
        stage('deploy') {
            steps {
                dir('/var/lib/jenkins/workspace/Front'){
                    sh "ls"
                    sh 'aws configure list --profile seopo'
                    sh "aws s3 sync dist s3://${AWS_ARN}  --delete --profile seopo"
                    echo 'deploy'
                }
            }
        }
    }
}
