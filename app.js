var express = require('express');
var zhihu = require('zhihu');
var app = express();
var http = require("http");
var https = require("https");

var steamApiKey = '918C2026B22CDA2B960E6F8B4C0E5A17';
var steamIdKey = '76561198044961500';


/*======REST function=======*/
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

/*app.get methods*/
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

app.get('/get-api/fetch_steam_state',function(req,res){
	var steam_result = {};
	var s = {
		host: 'api.steampowered.com',
		port: 443,
		path: '/ISteamUser/GetPlayerSummaries/v0002/?key='+steamApiKey+'&steamids='+steamIdKey+'&format=json',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	getJSON(s, function(statusCode, result) {
		console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
		steam_result["player_state"] = result.response.players[0];
		s = {
			host: 'api.steampowered.com',
			port: 443,
			path: '/IPlayerService/GetRecentlyPlayedGames/v0001/?key='+steamApiKey+'&steamids='+steamIdKey,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		getJSON(s, function(statusCode, result) {
			console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
			steam_result["game_list"] = result.response;
			res.setHeader('Content-Type', 'application/json');
			res.send(steam_result);
		});
	});
});

var server = app.listen(8964, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
