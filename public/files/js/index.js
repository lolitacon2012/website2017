//initialize app vue
var app = new Vue({
  el: '#app',
  data: {
  	isNotOnTop: false,
    isTooShort: false,
    useTategaki: true,
    zhihu_state: 0,
    zhihu_message_list: ["zhihu.com"],
  },
  computed: {
  zhihu_message: function () {
    return this.zhihu_message_list[this.zhihu_state];
  }
}
})

//initialize variables
app.isNotOnTop = ($(window).scrollTop() >= 20);
app.isTooShort = false;

//initialize events
$(window).scroll(function() {
  app.isNotOnTop = ($(window).scrollTop() >= 20);
  console.log($(window).scrollTop());
});
$( window ).resize(function() {
  app.isTooShort = false;
});


//fetch zhihu data and update
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      prepareZhihuMessage(this.responseText);
    }
  };
xhttp.open("GET", "http://gakumusume.com/get-api/fetch_zhihu_state?t=" + Math.random(), true);
xhttp.send();

function prepareZhihuMessage(obj){
	//{"answer":75,"post":2,"follower":1780,"profileUrl":"https://www.zhihu.com/people/xue-niang","name":"巫部親雲上","sex":"male"}
	obj = JSON.parse(obj);
	app.zhihu_message_list.push(obj["name"]);
	app.zhihu_message_list.push(obj["follower"] + " フォロワー");
	app.zhihu_message_list.push(obj["answer"] + " 回答数");
}

//card messages
setInterval(function(){
	app.zhihu_state = ((app.zhihu_state + 1)%(app.zhihu_message_list.length));
	console.log(app.zhihu_state);
}, 5000);