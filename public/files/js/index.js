/*Index*/
/*
Section 1: device detection
Section 2: vue app initialization
Section 3: global & vue app variable/ui events initialization
Section 4: fetch & set data
Section 5: utilities
*/

//=========================Section 1: device detection====================
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
  isMobile = true;
}
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
//=========================End of Section 1: device detection====================

//=========================Section 2: vue app initialization====================
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

//=========================End of Section 2: vue app initialization====================

//=========================Section 3: global & vue app variable/ui events initialization=========
//initialize variables
app.isNotOnTop = ($(window).scrollTop() >= 25);
var lastScrollTop = $(window).scrollTop();
var card_global_state = 0;

//initialize scrolling events.
$(window).scroll(function() {
  var st = $(window).scrollTop();
  console.log($( "#navbar_collapse_button" ).hasClass( "collapsed" ));
  if (st > lastScrollTop){
    app.hideTopBarForMobile = isMobile && app.isNotOnTop && (!$( "#navbarsTop" ).hasClass( "show" ));
 } else {
   app.hideTopBarForMobile = false;
 }
 lastScrollTop = $(window).scrollTop();
 app.isNotOnTop = ($(window).scrollTop() >= 25);
});

//=========================End of Section 3: global & vue app variable/ui events initialization=========

//=========================Section 4: fetch & set data=================================
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

//card messages
if(!isIE){
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
}, 1400);
}

//=========================End of Section 4: fetch & set data=================================



//=========================Section 5: utilities=================================
var sorry = function(){
  swal({
    title: "Sorry...",
    text: "Site is under construction",
    icon: "http://pictogram2.com/p/p0582/i/m.png",
    button: "I see...",
  });
}

Pace.on('done', function() {
  $(".pace-loading-background").toggleClass("pace-done");
});
//=========================End of Section 5: utilities=================================