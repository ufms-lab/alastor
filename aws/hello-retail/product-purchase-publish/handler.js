'use strict';

module.exports.main = async (event, context) => {
  console.log('Function productPurchasePublish running.');

  let purchaseEvent = {};

  if (event.approved) {
    purchaseEvent = {
        productId: event.id,
        productPrice: event.price,
        userId: event.user,
        authorization: event.authorization,
        devFinished: 'false: might actually be finished.'
    };

  } else {
    purchaseEvent = {
        devFinished: 'false: might actually be finished.'
    };

    if (typeof event.failureReason === 'string' || event.failureReason instanceof String) {
        purchaseEvent.failureReason = event.failureReason;
    } else {
        purchaseEvent.failureReason = {...event.failureReason};
    }
  };

  return purchaseEvent;
};
