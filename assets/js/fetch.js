// Variables
var newsColumns = $('.newsColumn');

// Fetch Script Code

var redditKey = 'NWALDmX-ufQV53BKp0JLVw';
var redditRequestURL = 'https://www.reddit.com/r/memes/new.json?limit=10';

var redditRSlashNews = 'https://www.reddit.com/r/news/.json?limit=24';

var newsAPIKey = '2f267a06ae2f4a1b95005660a4a14c34';
var newsRequestURL = `http://newsapi.org/v2/top-headlines?country=us&apiKey=${newsAPIKey}`;

var cnnRequestURL = 'https://www.cnn.com/politics';

// News API Fetch
fetch(newsRequestURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log('News API Data Is:');
    console.log(data);
    for (var i = 0; i < data.articles.length; i++) {
        var news = $('.news');
        var articles = data.articles[i];
        var articleTitle = data.articles[i].title;
        var articleAuthor = data.articles[i].author;
        var articleDate = data.articles[i].publishedAt;
        var articleSource = data.articles[i].source.name;
        var articleLink = data.articles[i].url;
        var articleImage = data.articles[i].urlToImage;
        if (articleImage === null) articleImage = '';
        var articleContent = data.articles[i].content;
        var articleElement = $(`
        <div class="newsElement element">
            <div class="titleRow">
                <div class="newsArticleTitle elementTitle">
                    <span class="index">${i+1 + '. '}</span>
                    <a class="articleLink elementLink" target="_blank" href="${articleLink}">${articleTitle}</a>
                </div>
            </div>
            <span class="byLine">By ${articleAuthor}</span>
            <a class="articleLink elementLink" target="_blank" href="${articleLink}">
                <img class="articleImage" src="${articleImage}">
            </a>
        </div>
        `); // Had to do some of this next function in Vanilla JS
        news.append(articleElement);
        if (data.articles[i].urlToImage === null) {
            var newsElements = document.querySelectorAll('.newsElement');
            var newsArticleImages = document.querySelectorAll('.articleImage');
            newsArticleImages[i].style.display = 'none';
            var notFound = document.createElement('div');
            notFound.setAttribute('class','notFound');
            notFound.innerHTML = 'Image Not Found';
            newsElements[i].append(notFound);
         }
    }
})

fetch(redditRSlashNews)
.then(response => {
    return response.json();
}).then(data => {
    console.log('Reddit News API Data Is:');
    console.log(data);
    for (var i = 0; i < data.data.children.length; i++) {
        var subNews = $('.subNews');
        var redditURL = 'https://www.reddit.com';
        var subNewsSource = data.data.children[i].data.url;
        var subNewsSourceName = data.data.children[i].data.domain;
        var subNewsTitle = data.data.children[i].data.title;
        var subNewsAuthor = data.data.children[i].data.author;
        var subNewsLink = data.data.children[i].data.permalink;
        var authorLink = redditURL+'/user/'+subNewsAuthor;
        var subNewsElement = $(`
        <div class="subNewsElement element">
            <div class="subNewsTitle elementTitle">
                <div class="titleRow">
                    <span class="index subNewsIndex">${i+1 + '. '}</span>
                    <a class="subNewsLink elementLink" target="_blank" href="${redditURL+subNewsLink}">${subNewsTitle}</a>
                </div>
                <span class="byLine">By 
                        <a class="authorLink subNewsLink elementLink" href="${authorLink}" target="_blank">${subNewsAuthor}</a>
                </span>
            </div>
            <a class="subNewsLink elementLink subNewsSource" target="_blank" href="${subNewsSource}">
            <i class="fas fa-external-link-alt external"></i> ${subNewsSourceName}
            </a>
        </div>
        `); // Had to do this in vanilla JS
        subNews.append(subNewsElement);
    }
})

// Reddit Memes Fetch
fetch(redditRequestURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log('Reddit Meme API Data Is:');
    console.log(data);
    for (var i = 0; i < data.data.children.length; i++) {
        var reddit = $('.reddit');
        var redditURL = 'https://www.reddit.com';
        var memeImages = data.data.children[i].data.url;
        var memeTitle = data.data.children[i].data.title;
        var memeAuthor = data.data.children[i].data.author;
        var memeLink = data.data.children[i].data.permalink;
        var authorLink = redditURL+'/user/'+memeAuthor;
        var linkLettersArray = memeImages.split('');
        var memeElement = $(`
        <div class="redditMemeElement element">
            <div class="memeTitle elementTitle">
                <div class="titleRow">
                    <span class="index">${i+1 + '. '}</span>
                    <a class="memeLink elementLink" target="_blank" href="${redditURL+memeLink}">${memeTitle}</a>
                </div>
                <span class="byLine">By 
                        <a class="authorLink memeLink elementLink" href="${authorLink}" target="_blank">${memeAuthor}</a>
                </span>
            </div>
            <a class="memeLink elementLink" target="_blank" href="${redditURL+memeLink}">
                <img class="redditMeme" src="${memeImages}">
            </a>
        </div>
        `); // Had to do this in vanilla JS
        var memeSpecificImage = document.querySelectorAll('.redditMeme');
        // console.log(memeSpecificImage);
        if (linkLettersArray[8] === 'v' || linkLettersArray[8] === 'i') {
            // console.log(linkLettersArray);
        }
        reddit.append(memeElement);
    }
})
