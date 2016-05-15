var express = require("express");
var app = express();

var request = require("request");
// require('request-debug')(request, function(type, data, r) {
//   console.log(data.headers.location);
// });

//Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Ocp-Apim-Subscription-Key");
    next();
});

//retrieve stats for last 5 matches from inputted gamer
app.get("/stats/h5/players/:playerId/matches", function(req, res) {
    request({
        method: "GET",
        uri: "https://www.haloapi.com/stats/h5/players/" + req.params.playerId + "/matches?mode=arena&count=1",
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

//request to return individiual match stats
app.get("/stats/h5/arena/matches/:matchId", function(req, res) {
    request({
        method: "GET",
        uri: "https://www.haloapi.com/stats/h5/arena/matches/" + req.params.matchId,
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

//request to return gamer service record
app.get("/stats/h5/servicerecords/arena/", function(req, res) {
    request({
        method: "GET",
        uri: "https://www.haloapi.com/stats/h5/servicerecords/arena?players=" + req.query.players,
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


//request to return spartan image
app.get("/profile/h5/profiles/:gamerTag/spartan", function(req, res) {
    request({
        method: "GET",
        uri: "https://www.haloapi.com/profile/h5/profiles/" + req.params.gamerTag + "/spartan",
        headers: {
            "Ocp-Apim-Subscription-Key": req.headers["ocp-apim-subscription-key"]
        },
        followRedirect: false
    }, function(error, response, body) {
        if (!error) {
          res.json({
            playerImage: response.headers.location
          });
        } else {
            res.sendStatus(400);
        }
    });
});

app.listen(process.env.PORT || 3000);
