var express = require('express');
var zhihu = require('zhihu');
var app = express();

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.use('/', express.static('public/node_web_2'));

var server = app.listen(8964, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
