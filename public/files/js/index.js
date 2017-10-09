

//initialize app vue
var app = new Vue({
  el: '#app',
  data: {
  	isNotOnTop: false,
    isTooShort: false,
    useTategaki: true
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