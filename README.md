# Serverless - AWS Node.js Typescript with Python

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

## Project create
`sls create --template aws-nodejs-typescript --path sls-tst-py`

## npm install
`npm install`

## Create Python dir
`mkdir py-src`

## Create Python virtual environment
```bash
python3 -m venv venv
source venv/bin/activate
```

## Create requirements.txt
`touch py-src/requirements.txt`

## Add functions in serverless.ts
serverless.ts

## Add build process
package.json
```json
"scripts": {
  "build": "tsc",
  "deploy": "npm run build && sls deploy --aws-profile serverless-test"
}
```

## Local test
```bash
# Python function
sls invoke local -f pyFunction --path tests/mocks/mock.json
Running "serverless" from node_modules
{
    "statusCode": 200,
    "body": "{\"message\": \"Hello Frederic, This is Python handler!\"}"
}

# TypeScript function
sls invoke local -f hello --path tests/mocks/mock.json
Running "serverless" from node_modules
{
    "statusCode": 200,
    "body": "{\"message\":\"Hello Frederic, This is TypeScript handler!\",\"event\":{\"headers\":{\"Content-Type\":\"application/json\"},\"body\":{\"name\":\"Frederic\"},\"rawBody\":\"{\\\"name\\\": \\\"Frederic\\\"}\"}}"
}
```

## Deploy
`npm run deploy`

## Other

### Project structure only TypeScript

The project code base is mainly located within the `ts-src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── ts-src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── hello
│   │   │   ├── handler.ts      # `Hello` lambda source code
│   │   │   ├── index.ts        # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json       # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
