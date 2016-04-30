var express = require("express");
var app = express();

var request = require("request");

//Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Ocp-Apim-Subscription-Key");
    next();
});

app.get("/stats/h5/players/:playerId/matches", function(req, res) {
    request({
        method: "GET",
        uri: "https://www.haloapi.com/stats/h5/players/" + req.params.playerId + "/matches",
        headers: {
            "Ocp-Apim-Subscription-Key": req.headers["ocp-apim-subscription-key"]
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        } else {
            res.sendStatus(400);
        }
    });
});

app.listen(process.env.PORT || 3000);
