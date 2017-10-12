var express = require('express');
var zhihu = require('zhihu');
var app = express();
var SteamApi = require('steam-api');
var http = require("http");
var https = require("https");

var steamApiKey = '918C2026B22CDA2B960E6F8B4C0E5A17';
var steamIdKey = '76561198044961500';
 

var steamUser = new SteamApi.User(steamApiKey, steamIdKey);
var steamUserStats = new SteamApi.UserStats(steamApiKey, steamIdKey);
var steamNews = new SteamApi.News(steamApiKey, steamIdKey);
var steamApp = new SteamApi.App(steamApiKey, steamIdKey);
var steamPlayer = new SteamApi.Player(steamApiKey, steamIdKey);
var steamInventory = new SteamApi.Inventory(steamApiKey, steamIdKey);
var steamItems = new SteamApi.Items(steamApiKey, steamIdKey);

/*======get request sender=======*/
var getJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
    	console.log(err);
        //res.send('error: ' + err.message);
    });

    req.end();
};

var s = {
    host: 'api.steampowered.com',
    port: 443,
    path: '/ISteamUser/GetPlayerSummaries/v0002/?key='+steamApiKey+'&steamids='+steamIdKey,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

getJSON(s, function(statusCode, result) {
    // I could work with the result html/json here.  I could also just return it
    console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
});


app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.use('/', express.static('public/files'));

app.get('/get-api/fetch_zhihu_state',function(req,res){
	zhihu.User.info("xue-niang").then(function(user){
  		console.log(user);
  		res.setHeader('Content-Type', 'application/json');
    	res.send(user);
	});
});

var server = app.listen(8964, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
