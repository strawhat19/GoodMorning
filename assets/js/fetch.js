// Fetch Script Code
console.log('This is where we fetch our info');

var redditKey = 'NWALDmX-ufQV53BKp0JLVw';
var redditRequestURL = 'https://www.reddit.com/r/memes/new.json?limit=12';

fetch(redditRequestURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log(data);
    for (var i = 0; i < data.data.children.length; i++) {
        console.log(data.data.children[i]);
        console.log(data.data.children[i].data.url);
        var reddit = $('.reddit');
        var memes = data.data.children[i].data.url;
        var memeTitle = data.data.children[i].data.title;
        var memeImage = $(`<div class="redditMemeElement">${i+1 + '. '}${memeTitle}<img class="redditMeme" src="${memes}"></div>`);
        reddit.append(memeImage);
    }
})
