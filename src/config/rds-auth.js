const AWS = require("aws-sdk");
// const Config = require("./config");

// const region = "us-east-1";
// const dbPort = 3306;
// const dbUsername = "backendUser";
// const dbName = "control3db";
// const dbEndpoint = "tendenciasdb.cirt9lkaraum.us-east-1.rds.amazonaws.com";

function authRds(obj) {
    try {
        const signer = new AWS.RDS.Signer();
        const token = signer.getAuthToken(obj);
        return token;
    } catch (error) {
        console.error(`could not get auth token: ${error}`);
        return null;
    }
}

module.exports = authRds;
