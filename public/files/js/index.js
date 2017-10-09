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


//fetch data
var dataFetch = new Promise((resolve, reject) => {
	console.log("prepare to fetch");
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code. 
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout(function(){
    console.log("fetch done");
    resolve("Success!"); // Yay! Everything went well!
  }, 250);
});

dataFetch.then((successMessage) => {
	console.log("success");
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage);
});


//card messages
setInterval(function(){
	app.zhihu_state = ((app.zhihu_state + 1)%(app.zhihu_message_list.length));
	console.log(app.zhihu_state);
}, 5000);