const request = require('request');
const config  = require("./config.js");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function serialize(data) {
    let parts = [],
        field;

    for (field in data) {
        if(Array.isArray(data[field])) {
            data[field].forEach((d, idx) => {
                const key = `${field}[${idx}]`;

                parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(d)}`);
            });

            continue;
        }

        parts.push(`${field}=${encodeURIComponent(data[field])}`);
    }

    return parts.join("&");
}

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
        options.headers = req.headers;
        options.body = serialize(req.body);
        options.json = true;
    }

    console.log(`[${options.method.toUpperCase()}] ${config.baseUrl}${options.url}, body: ${options.body}`);

    return new Promise((resolve, rej) => {
        request(options, (err, res, body) => err ? rej(err) : resolve(res));
    });
};
