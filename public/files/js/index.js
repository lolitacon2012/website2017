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
app.isNotOnTop = ($(document).scrollTop() >= 20);
app.isTooShort = false;

//initialize events
$(document).scroll(function() {
  app.isNotOnTop = ($(document).scrollTop() >= 20);
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
	app.zhihu_message_list.push(obj.name);
	app.zhihu_message_list.push(obj.follower + " Followers");
	app.zhihu_message_list.push(obj.answer + " Answers");
}

//card messages
setInterval(function(){
	app.zhihu_state = ((app.zhihu_state + 1)%(app.zhihu_message_list.length));
	console.log(app.zhihu_state);
}, 5000);