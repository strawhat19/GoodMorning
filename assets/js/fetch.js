// Fetch Script Code
console.log('This is where we fetch our info');

var redditKey = 'NWALDmX-ufQV53BKp0JLVw';
var redditRequestURL = 'https://www.reddit.com/r/videos/new?limit=25';

fetch(redditRequestURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log(data);
})
