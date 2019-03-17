export default {

  MAX_ATTACHMENT_SIZE: 5000000,

  s3: {

    REGION: "us-east-1",
    BUCKET: "serverless-stack-notes-a-serverlessdeploymentbuck-1wcfuicn3vyyp"

  },
  apiGateway: {

    REGION: "us-east-1",
    URL: "https://bzuf7tgdme.execute-api.us-east-1.amazonaws.com/dev"

  },
  cognito: {

    REGION: 'us-east-1',
    USER_POOL_ID:  "us-east-1_FEhqxPsrp",
    APP_CLIENT_ID: "q59rulf0msam712411aa2o9qv",
    IDENTITY_POOL_ID: "us-east-1:f7d18fe9-96cb-4b84-92d9-573d8ccbc839"

  }

};
