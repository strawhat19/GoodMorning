// Variables
var newsColumns = $('.newsColumn');

// Fetch Script Code

var redditKey = 'NWALDmX-ufQV53BKp0JLVw';
var redditRequestURL = 'https://www.reddit.com/r/memes/new.json?limit=10';

var newsAPIKey = '2f267a06ae2f4a1b95005660a4a14c34';
var newsRequestURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsAPIKey}`;

var cnnRequestURL = 'https://www.cnn.com/politics';

fetch(newsRequestURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log(data);
    for (var i = 0; i < data.articles.length; i++) {
        var news = $('.news');
        var articles = data.articles[i];
        var articleTitle = data.articles[i].title;
        var articleAuthor = data.articles[i].articleAuthor;
        var articleDate = data.articles[i].publishedAt;
        var articleSource = data.articles[i].source.name;
        var articleLink = data.articles[i].url;
        var articleImage = data.articles[i].urlToImage;
        if (articleImage === null) articleImage = '';
        var articleContent = data.articles[i].content;
        var articleElement = $(`
        <div class="newsElement">${i+1 + '. '}${articleTitle}<img class="articleImage" src="${articleImage}"></div>
        `); // Had to do this next function in Vanilla JS
        news.append(articleElement);
        if (data.articles[i].urlToImage === null) {
            var newsElements = document.querySelectorAll('.newsElement');
            console.log(newsElements[i].childNodes[1]);
            newsElements[i].childNodes[1].style.display = 'none';
            var notFound = document.createElement('div');
            notFound.setAttribute('class','notFound');
            notFound.innerHTML = 'Image Not Found';
            newsElements[i].append(notFound);
         }
    }
})

fetch(redditRequestURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log(data);
    for (var i = 0; i < data.data.children.length; i++) {
        // console.log(data.data.children[i]);
        // console.log(data.data.children[i].data.url);
        var reddit = $('.reddit');
        var memeImages = data.data.children[i].data.url;
        var memeTitle = data.data.children[i].data.title;
        var memeElement = $(`
        <div class="redditMemeElement">${i+1 + '. '}${memeTitle}<img class="redditMeme" src="${memeImages}"></div>
        `);
        reddit.append(memeElement);
    }
})
