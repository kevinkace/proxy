const request = require('request');
const config  = require("./config.js");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = function(req) {
    const options = {
        baseUrl : config.baseUrl,
        url     : req.url,
        method  : req.method,
        qs      : req.query
    };

    if (
        req.method === "PATCH" ||
        req.method === "POST"  ||
        req.method === "PUT"
    ) {
        options.body = req.body;
        options.json = true;
    }

    console.log(`[${options.method.toUpperCase()}] Requesting ${options.url}`);

    return new Promise((resolve, rej) => {
        request(options, (err, res, body) => err ? rej(err) : resolve(res));
    });
};
