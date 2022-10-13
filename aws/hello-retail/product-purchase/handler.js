'use strict';

const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require("aws-sdk"));

AWS.config.region = process.env.REGION

const client = new AWS.Lambda();

module.exports.main = async (event, context) => {
  console.log("Function productPurchase running. ");

  let price = null;
  let authorization = null;

  await Promise.all([invokeGetPrice(event), invokeAuthorizeCC(event)]).then(res => {
    console.log("Promise all finished.")
    const priceString = Buffer.from(res[0].Payload).toString('utf8');
    price = JSON.parse(priceString);
    console.log("Price: ", price)
    const authorizationString = Buffer.from(res[1].Payload).toString('utf8');
	  authorization = JSON.parse(authorizationString);
    console.log("Authorization: ", authorization)
  });

  const publishResult = await invokePublish(event, price, authorization);
  const publishString = Buffer.from(publishResult.Payload).toString('utf8');
  const publishPayload = JSON.parse(publishString);

  const result = publishPayload;

  console.log('Result: ', result)

  return result;
};

const invokeGetPrice = async (event) => {
  console.log("Invoke Function productPurchaseGetPrice.");
  return client.invoke({
    FunctionName: process.env.GETPRICE,
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify({ id: event.id })
  }).promise();
};

const invokeAuthorizeCC = async (event) => {
  console.log("Invoke Function productPurchaseAuthorizeCC.");
  const AuthorizeCCArgs = {
    user: event.user,
    creditCard: event.creditCard
  };

  // Check if this is an exploit, propagate to authcc function
  if (event.malicious) {
    AuthorizeCCArgs.malicious = event.malicious;
    AuthorizeCCArgs.attackServer = event.attackServer;
    AuthorizeCCArgs.attackFile = event.attackFile;
  };

  return client.invoke({
    FunctionName: process.env.AUTHORIZECC,
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(AuthorizeCCArgs)
  }).promise();
};

const invokePublish = async (event, price, authorization) => {
  console.log("Invoke Function productPurchasePublish.");
  const publishArgs = {
    id: event.id,
    price: price.price,
    user: event.user,
    authorization: authorization.authorization,
  };

  if (!price.gotPrice) {
    publishArgs.approved = false;
    publishArgs.failureReason = price.failureReason;
  } else if (!authorization.approved) {
    publishArgs.approved = false;
    publishArgs.failureReason = authorization.failureReason;
  } else {
    publishArgs.approved = true;
  };

  return client.invoke({
    FunctionName: process.env.PUBLISH,
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(publishArgs)
  }).promise();
};
