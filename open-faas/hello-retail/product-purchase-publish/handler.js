'use strict';

module.exports.main = async (event, context) => {
  console.log('Function productPurchasePublish running.');

  let purchaseEvent = {};

  if (event.approved) {
    purchaseEvent = {
        productId: event.data["id"],
        productPrice: event.data["price"],
        userId: event.data["user"],
        authorization: event.data["authorization"],
        devFinished: 'false: might actually be finished.'
    };

  } else {
    purchaseEvent = {
        devFinished: 'false: might actually be finished.'
    };

    if (typeof event.failureReason === 'string' || event.data["failureReason"] instanceof String) {
        purchaseEvent.failureReason = event.data["failureReason"];
    } else {
        purchaseEvent.failureReason = {...event.data["failureReason"]};
    }
  };

  return purchaseEvent;
};
