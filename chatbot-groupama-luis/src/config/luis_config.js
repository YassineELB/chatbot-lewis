const env = process.env.NODE_ENV;

const luisAppKey = '6a74e815-7edc-496d-a0ba-b66d4535bda6';
const luisAppVersion = '0.1';
const luisSubscriptionKey = '9efa000497ce428893b193fc99c84f07';

const development = {
  luisGetAppStatusUrl: `https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/${luisAppKey}/versions`,
  luisGetIntentsBaseUrl: `https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/${luisAppKey}/versions/${luisAppVersion}/intents`,
  luisGetEntitiesBaseUrl: `https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/${luisAppKey}/versions/${luisAppVersion}/entities`,
  luisGetLabelsPerIntentUrl: `https://westus.api.cognitive.microsoft.com/luis/webapi/v2.0/apps/${luisAppKey}/versions/${luisAppVersion}/stats/labelsperintent?subscription-key=${luisSubscriptionKey}`,
  luisGetLabelsPerEntityUrl: `https://westus.api.cognitive.microsoft.com/luis/webapi/v2.0/apps/${luisAppKey}/versions/${luisAppVersion}/stats/labelsperentity?subscription-key=${luisSubscriptionKey}`,
  luisPostUtteranceToIntentUrl: `https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/${luisAppKey}/versions/${luisAppVersion}/example`,
  luisPostIntentUrl: `https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/${luisAppKey}/versions/${luisAppVersion}/intents`,
  luisCallConfig: {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': luisSubscriptionKey
    }
  }
};

const config = {
  development
};

if (typeof config[env] === 'undefined') {
  throw new Error("No value / wrong value for environment variable NODE_ENV");
}

module.exports = config[env];
