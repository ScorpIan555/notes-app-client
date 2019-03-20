const dev = {

  MAX_ATTACHMENT_SIZE: 5000000,

  s3: {

    REGION: "us-east-1",
    BUCKET: "serverless-stack-notes-app-api-attachmentsbucket-1dghsqg3dicvq"

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


const prod = {

  MAX_ATTACHMENT_SIZE: 5000000,

  s3: {

    REGION: "us-east-1",
    BUCKET: "serverless-stack-notes-app-api-attachmentsbucket-real62yl8eif"

  },
  apiGateway: {

    REGION: "us-east-1",
    URL: "https://shg7osmvui.execute-api.us-east-1.amazonaws.com/prod"

  },
  cognito: {

    REGION: 'us-east-1',
    USER_POOL_ID:  "us-east-1_7Ow6cxScD",
    APP_CLIENT_ID: "68ufohnjs9qlslhr2ejar70r2o",
    IDENTITY_POOL_ID: "us-east-1:f0553bdc-8b49-4f94-a503-c8a9dff7c43d"

  }

};


const config = process.env.REACT_APP_STAGE === 'prod'
    ?  prod
    :  dev;


export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE:  5000000,
  ...config

};
