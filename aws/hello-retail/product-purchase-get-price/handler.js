'use strict';

module.exports.main = async (event, context) => {
  console.log('Function productPurchaseGetPrice running.');
  console.log(event.id);

  let response = {
    gotPrice: false,
    failureReason: 'No price in the catalog',
    devFinished: false
  };

  if (Math.random() < 0.9) {
    response = {
      gotPrice: true,
      price: randomPrice(),
      devFinished: 'false: does not use database, generates random price.'
    }
  };

  return response;
};

const randomPrice = () => {
  var cents = Math.floor(Math.random() * 100);
  var dollars = Math.floor(Math.random() * 100);

  return (dollars + (cents * .01)).toFixed(2);
};
