'use strict'

const { LambdaClient } = require("@aws-sdk/client-lambda");

const client = new LambdaClient({ region: process.env.REGION });

module.exports.main = async (event, context) => {
  console.log('Function productPurchase running.');

  let price = null;
  let authorization = null;

  await Promise.all([invokeGetPrice(event), invokeAuthorizeCC(event)]).then(res => {
    console.log(res);
    price = JSON.parse(res[0].Payload);
	  authorization = JSON.parse(res[1].Payload);
  });

  const publishResult = await invokePublish(event, price, authorization);

  const publishPayload = JSON.parse(publishResult.Payload)

  const result = publishPayload

  return result
};

const invokeGetPrice = (event) => {
  return client.send({
    FunctionName: process.env.GETPRICE,
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify({ id: event.id })
  })
}

const invokeAuthorizeCC = (event) => {
  const AuthorizeCCArgs = {
    user: event.user,
    creditCard: event.creditCard
  }

  // Check if this is an exploit, propagate to authcc function
  if (event.malicious) {
    AuthorizeCCArgs.malicious = event.malicious;
    AuthorizeCCArgs.attackserver = event.attackserver;
  }

  return client.send({
    FunctionName: process.env.AUTHORIZECC,
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(AuthorizeCCArgs)
  })
}

const invokePublish = (event, price, authorization) => {
  const publishArgs = {
    id: event.id,
    price: price.price,
    user: event.user,
    authorization: authorization.authorization,
  }

  if (!price.gotPrice) {
    publishArgs.approved = false;
    publishArgs.failureReason = price.failureReason;
  } else if (!authorization.approved) {
    publishArgs.approved = false;
    publishArgs.failureReason = authorization.failureReason;
  } else {
    publishArgs.approved = true;
  }

  return client.send({
    FunctionName: process.env.PUBLISH,
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(publishArgs)
  })
}
