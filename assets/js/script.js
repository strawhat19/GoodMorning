// GoodMorning App
console.log('GoodMorning App!');

// Declaring Variables
var colorBoxes = document.querySelectorAll('.color');
var colorCodes = document.querySelectorAll('.colorCode');
colorCodes.innerHTML = colorBoxes.style.background;
