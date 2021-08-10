// GoodMorning App
console.log('GoodMorning App!');

// Declaring Main Variables
var cnn = document.querySelector('#cnn');
var reddit = document.querySelector('#reddit');
var abc = document.querySelector('abc');
var espn = document.querySelector('ESPN');
var cspan = document.querySelector('CNBC');
var news = document.querySelector('news');

  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

// Check if there are any navbar burgers
if ($navbarBurgers.length > 0) {

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });
}

var dowJonesURL = `https://api.dowjones.com/content-collections/drn%3Aconsumer.collection.originid.NP_GlobalNews_1?prepub=true`
// National Archives API
fetch(dowJonesURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log('Dow Jones Archives Data Is:');
    console.log(data);
})
