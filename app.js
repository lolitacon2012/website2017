var express = require('express');
var zhihu = require('zhihu');
var app = express();
var SteamApi = require('steam-api');
 
var steamUser = new SteamApi.User('918C2026B22CDA2B960E6F8B4C0E5A17', '76561198044961500');
console.log(steamUser);

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
