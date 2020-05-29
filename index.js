const express = require("express");
const app     = express();
const extReq  = require("./ext-req");

app.use(express.json());

// catches all requests on port
app.all("/*",
    // make outbound request
    (req, res, next) => {
        console.log(`proxying request to ${req.url}`);

        extReq(req)
            .then(res2 => {
                res.body = res2.body;

                next();
            })
            .catch(err => {
                res.body = "{}";

                next();
            });
    },

    // parse body?
    // (req, res, next) => {
    //     try {
    //         res.parsed = JSON.parse(res.body);
    //     } catch (err) {
    //         console.log("error parsing" + err);
    //     }

    //     next();
    // },

    // respond
    (req, res) => res.parsed ? res.json(res.parsed) : res.send(res.body)
);

app.listen(3000, () => console.log("running server"));
