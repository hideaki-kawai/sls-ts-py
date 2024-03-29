import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'sls-ts-py',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-python-requirements', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    // tsFunction: {
    //   handler: 'ts-src/hello/handler.hello', // TypeScript関数のパス
    //   runtime: 'nodejs18.x',
    // },
    hello, // TypeScriptの関数のパス
    pyFunction: { // Python関数の設定
      handler: 'py-src/hello/handler.hello', // Python関数のパス
      runtime: 'python3.11', // Pythonランタイム
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
