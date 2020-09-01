#!/usr/bin/env groovy

pipeline {
    agent {
        kubernetes {
            label 'slave-chrome'
        }
    }

    environment {
        NODE_JS_INSTALLATION_NAME = 'wc3-node-10.15.3-npm-6.3.0'
        NODE_JS_CONFIG_ID = '33802177-400f-414c-9807-fdc9d63daa33'
    }
    stages {
        stage('Checkout from github') {
            steps {
                git url: 'https://github.com/Backbase/bb-protractor-accessibility-plugin.git'
            }
        }
        stage ('Build & Test') {
            steps {
                nodejs(nodeJSInstallationName: NODE_JS_INSTALLATION_NAME, configId: NODE_JS_CONFIG_ID) {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }
        stage ('Publish') {
            steps {
                nodejs(nodeJSInstallationName: NODE_JS_INSTALLATION_NAME, configId: NODE_JS_CONFIG_ID) {
                    withCredentials([string(credentialsId: 'public-registry-npm-token', variable: 'NPM_TOKEN')]) {
                        sh "NPM_TOKEN=$NPM_TOKEN npm publish --userconfig ../.npmrc-publish"
                    }
                }
            }
        }
    }
}