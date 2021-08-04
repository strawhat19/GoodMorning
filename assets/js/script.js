// GoodMorning App
console.log('GoodMorning App!');

// Declaring Variables
var colorBoxes = document.querySelectorAll('.color');
var colorCodes = document.querySelectorAll('.colorCode');
colorCodes.innerHTML = colorBoxes.style.background;
console.log("test");


// Materialize JS
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
  //hi
  var cnn = document.querySelector('#cnn');
  var reddit = document.querySelector('#reddit');
  var abc = document.querySelector('abc');
  var espn = document.querySelector('ESPN');
  var cspan = document.querySelector('CNBC');
  var news = document.querySelector('news')