'use strict';

module.exports.main = async (event, context) => {
  console.log('Function productPurchasePublish running.');

  let purchaseEvent = {};

  if (event.body["approved"]) {
    purchaseEvent = {
        productId: event.body["id"],
        productPrice: event.body["price"],
        userId: event.body["user"],
        authorization: event.body["authorization"],
        devFinished: 'false: might actually be finished.'
    };

  } else {
    purchaseEvent = {
        devFinished: 'false: might actually be finished.'
    };

    if (typeof event.body["failureReason"] === 'string' || event.body["failureReason"] instanceof String) {
        purchaseEvent.failureReason = event.body["failureReason"];
    } else {
        purchaseEvent.failureReason = {...event.body["failureReason"]};
    }
  };

  return purchaseEvent;
};
