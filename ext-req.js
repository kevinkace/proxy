const request = require('request');

const config = require("./config.js");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = function(req) {
    const url = config.baseUrl + req.url;

    console.log(`Requesting ${url}`);

    return new Promise((resolve, rej) => {
        request(url, (err, res, body) => err ? rej(err) : resolve(res));
    });
};
