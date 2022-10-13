'use strict';

const axios = require('axios')

module.exports.main = async (event, context) => {
  console.log("Function productPurchase running. ", event.body);

  let price = null;
  let authorization = null;

  await Promise.all([GetPrice(event), AuthorizeCC(event)]).then(res => {
    console.log("Promise all finished.")
    price = res[0];
    console.log("Price: ", price)
    authorization = res[1];
    console.log("Authorization: ", authorization)
  });

  const publishResult = await Publish(event, price, authorization);

  const result = publishResult;

  console.log('Result: ', result)

  return result;
};

const GetPrice = async (event) => {
  console.log("call Function productPurchaseGetPrice.");
  const getPriceData = {
    "id": event.body["id"]
  };
  return axios({
    method: 'post',
    url: process.env.URL_GETPRICE,
    data: getPriceData
  });
};
  
const AuthorizeCC = async (event) => {
  console.log("Call Function productPurchaseAuthorizeCC.");
  const AuthorizeCCData = {
    user: event.body["user"],
    creditCard: event.body["creditCard"]
  };

  // Check if this is an exploit, propagate to authcc function
  if (event.body["malicious"]) {
    AuthorizeCCData.malicious = event.body["malicious"];
    AuthorizeCCData.attackServer = event.body["attackServer"];
    AuthorizeCCData.attackFile = event.body["attackFile"];
  };

  return axios({
    method: 'post',
    url: process.env.URL_AUTHORIZECC,
    data: AuthorizeCCData
  });
};

const Publish = async (event, price, authorization) => {
  console.log("Invoke Function productPurchasePublish.");
  const publishData = {
    id: event.id,
    price: price.price,
    user: event.user,
    authorization: authorization.authorization,
  };

  if (!price.gotPrice) {
    publishData.approved = false;
    publishData.failureReason = price.failureReason;
  } else if (!authorization.approved) {
    publishData.approved = false;
    publishData.failureReason = authorization.failureReason;
  } else {
    publishData.approved = true;
  };

  return axios({
    method: 'post',
    url: process.env.URL_PUBLISH,
    data: publishData
  });
};
