//initialize app vue
var app = new Vue({
  el: '#app',
  data: {
  	isNotOnTop: false,
    hideTopBarForMobile: false,
    useTategaki: true,
    zhihu_state: 0,
    zhihu_message_list: ["知乎"],
    steam_state: 0,
    steam_message_list: ["Steam"],
    steam_game_icon_list: ["img/steam.jpg","img/cake.png"],
    steam_online_state: -1,
    steam_front_img: "img/steam.jpg",
    steam_back_img: "img/cake.png",
    search_recommend_keyword: "Search recommend"
  },
  computed: {
    zhihu_message: function () {
      return this.zhihu_message_list[this.zhihu_state];
    },
    steam_message: function () {
      return this.steam_message_list[this.steam_state];
    },
    steam_flip: function (){
      return (this.steam_state%2 == 1);
    },

  }
})

//initialize variables
app.isNotOnTop = ($(window).scrollTop() >= 25);
var lastScrollTop = $(window).scrollTop();
var card_global_state = 0;

//initialize events
$(window).scroll(function() {
  var st = $(window).scrollTop();
  if (st > lastScrollTop){
   app.hideTopBarForMobile = app.isNotOnTop && $( "#navbar_collapse_button" ).hasClass( "collapsed" );
 } else {
   app.hideTopBarForMobile = false;
 }
 lastScrollTop = $(window).scrollTop();

 app.isNotOnTop = ($(window).scrollTop() >= 25);
 console.log($(window).scrollTop());
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
	obj = JSON.parse(obj);
	app.zhihu_message_list.push(obj["name"]);
	app.zhihu_message_list.push(obj["follower"] + " フォロワー");
	app.zhihu_message_list.push(obj["answer"] + " 回答数");
}


//fetch steam data and update
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange=function() {
  if (this.readyState == 4 && this.status == 200) {
    prepareSteamMessage(this.responseText);
  }
};
xhttp.open("GET", "http://gakumusume.com/get-api/fetch_steam_state?t=" + Math.random(), true);
xhttp.send();

function prepareSteamMessage(obj){
  obj = JSON.parse(obj);
  app.steam_online_state = obj.player_state.personastate;
  app.steam_message_list.push(obj.player_state.personaname);
  for(var i=0;i<obj.game_list.total_count;i++){
    var game = obj.game_list.games[i];
    app.steam_message_list.push(game.name);
    app.steam_game_icon_list.push("https://steamdb.info/static/camo/apps/"+game.appid+"/header.jpg");
  }
}

//card messages for zhihu
setInterval(function(){
  var r = Math.random();
  if(r>0.75){
    app.zhihu_state = ((app.zhihu_state + 1)%(app.zhihu_message_list.length));
  }else if(r>0.5){
    app.steam_state = ((app.steam_state + 1)%(app.steam_message_list.length));
    if(app.steam_flip){
      app.steam_back_img = app.steam_game_icon_list[app.steam_state];
    }else{
      app.steam_front_img = app.steam_game_icon_list[app.steam_state];
    }
  }
}, 2300);

var sorry = function(){
  swal({
  title: "Sorry...",
  text: "Site is under construction",
  icon: "http://pictogram2.com/p/p0582/i/m.png",
  button: "I see...",
});
}
sorry();