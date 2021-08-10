// Variables
var newsColumns = $('.newsColumn');

// R/news
var redditKey = 'NWALDmX-ufQV53BKp0JLVw';
var redditRSlashNews = 'https://www.reddit.com/r/news/.json?limit=24';

// Fetching
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
        `);
        subNews.append(subNewsElement);
    }
})

// Reddit CNN
var redditRequestURL = 'https://www.reddit.com/r/cnn/new.json?limit=24';

// Reddit CNN Fetch
fetch(redditRequestURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log('Reddit CNN API Data Is:');
    console.log(data);
    for (var i = 0; i < data.data.children.length; i++) {
        var reddit = $('.slashCNN');
        var redditURL = 'https://www.reddit.com';
        var cnnSources = data.data.children[i].data.url;
        var cnnSourceName = data.data.children[i].data.domain;
        var cnnTitle = data.data.children[i].data.title;
        var cnnAuthor = data.data.children[i].data.author;
        var cnnLink = data.data.children[i].data.permalink;
        var authorLink = redditURL+'/user/'+cnnAuthor;
        var linkLettersArray = cnnSources.split('');
        var cnnElement = $(`
        <div class="redditcnnElement element">
            <div class="cnnTitle elementTitle">
                <div class="titleRow">
                    <span class="index">${i+1 + '. '}</span>
                    <a class="cnnLink elementLink" target="_blank" href="${redditURL+cnnLink}">${cnnTitle}</a>
                </div>
                <span class="byLine">By 
                        <a class="authorLink cnnLink elementLink" href="${authorLink}" target="_blank">${cnnAuthor}</a>
                </span>
            </div>
            <a class="cnnLink elementLink cnnSource" target="_blank" href="${cnnSources}">
                <i class="fas fa-external-link-alt external"></i> ${cnnSourceName}
            </a>
        </div>
        `);
        reddit.append(cnnElement);
    }
})

// National Archives
var nationalArchivesAPI = `https://catalog.archives.gov/api/v1/`;

// National Archives API
fetch(nationalArchivesAPI)
.then(response => {
    return response.json();
}).then(data => {
    console.log('National Archives Data Is:');
    console.log(data);
})

// Fetching Nasa Images
var nasaKey = `wC0OktvMTSEtJByir363uFfuw3YhKmezYxfQ1BGq`;
var nasaImagesSearch = `https://images-api.nasa.gov/search?q=planet`;
var nasaImagesKey = `https://images-api.nasa.gov?api_key=wC0OktvMTSEtJByir363uFfuw3YhKmezYxfQ1BGq`;

// NASA Images API
fetch(nasaImagesSearch)
.then(response => {
    return response.json();
}).then(data => {
    var nasa = $('.nasa');
    console.log('NASA Image Data Is:');
    console.log(data);
    for (var i = 0; i < data.collection.items.length; i++) {
        var nasaImageTitle = data.collection.items[i].data[0].title;
        var nasaImageTitles = JSON.parse(localStorage.getItem('Nasa Titles')) || [];
        nasaImageTitles.push(nasaImageTitle);
        nasaImageTitles.splice(100);
        localStorage.setItem('Nasa Titles',JSON.stringify(nasaImageTitles));
        var nasaSideFetch = data.collection.items[i].href;
        fetch(nasaSideFetch).then(newResponse => {return newResponse.json()}).then((linkData,nasaImage) => {
            var nasaImageArray = filterImageGallery(linkData,'.jpg');
            var nasaLargeImage = nasaImageArray[0];
            var nasaVideoArray = filterImageGallery(linkData,'.mp4');
            var nasaVideo = nasaVideoArray[0];
            var nasaImageTitles = JSON.parse(localStorage.getItem('Nasa Titles')) || [];
            console.log(nasaImageTitles);
            var nasaImageElement = $(`
            <div class="nasaImageElement element">
                <div class="nasaImageTitle elementTitle">
                    <div class="titleRow">
                        <span class="index">${i + '. '}</span>
                        <a class="nasaImageLink elementLink" target="_blank" href="${nasaLargeImage}">${nasaImageTitles[i]}</a>
                    </div>
                    <span class="byLine"></span>
                 </div>
                <a class="nasaImageLink elementLink nasaImageSource" target="_blank" href="${nasaLargeImage}">
                    <img class="nasaImage" src="${nasaLargeImage}">
                </a>
            </div>
            `);
            localStorage.setItem('Nasa Image Links',JSON.stringify(nasaImageArray));
            localStorage.setItem('Nasa Video Links',JSON.stringify(nasaVideoArray));
            function filterImageGallery(array, query) {
                return array.filter(function(jpg) {
                    return jpg.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                })
            }
            nasa.append(nasaImageElement);
            return nasaImage;
        })
    }
    
})


// Reddit Memes
var redditMemeRequestURL = 'https://www.reddit.com/r/memes/new.json?limit=10';

// Reddit Memes Fetch
fetch(redditMemeRequestURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log('Reddit Meme API Data Is:');
    console.log(data);
    for (var i = 0; i < data.data.children.length; i++) {
        var reddit = $('.memes');
        var redditURL = 'https://www.reddit.com';
        var memeImages = data.data.children[i].data.url;
        var memeTitle = data.data.children[i].data.title;
        var memeAuthor = data.data.children[i].data.author;
        var memeLink = data.data.children[i].data.permalink;
        var authorLink = redditURL+'/user/'+memeAuthor;
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
        `);
        reddit.append(memeElement);
    }
})

// News API
var newsAPIKey = '2f267a06ae2f4a1b95005660a4a14c34';
var newsRequestURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsAPIKey}`;

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

// // Fetching Nasa Data
// var nasaAPI = `https://api.nasa.gov/planetary/apod?api_key=wC0OktvMTSEtJByir363uFfuw3YhKmezYxfQ1BGq`;

// // NASA API
// fetch(nasaAPI)
// .then(response => {
//     return response.json();
// }).then(data => {
//     console.log('NASA Data Is:');
//     console.log(data);
// })


// Deprecated

// ABC
// var abcRequestURL = `https://api.abc.com/resources/.json?limit=24`;

// // ABC News
// fetch(abcRequestURL)
// .then(response => {
//     return response.json();
// }).then(data => {
//     console.log('ABC News API Data Is:');
//     console.log(data);
//     // for (var i = 0; i < data.data.children.length; i++) {
//     //     var subNews = $('.subNews');
//     //     var redditURL = 'https://www.reddit.com';
//     //     var subNewsSource = data.data.children[i].data.url;
//     //     var subNewsSourceName = data.data.children[i].data.domain;
//     //     var subNewsTitle = data.data.children[i].data.title;
//     //     var subNewsAuthor = data.data.children[i].data.author;
//     //     var subNewsLink = data.data.children[i].data.permalink;
//     //     var authorLink = redditURL+'/user/'+subNewsAuthor;
//     //     var subNewsElement = $(`
//     //     <div class="subNewsElement element">
//     //         <div class="subNewsTitle elementTitle">
//     //             <div class="titleRow">
//     //                 <span class="index subNewsIndex">${i+1 + '. '}</span>
//     //                 <a class="subNewsLink elementLink" target="_blank" href="${redditURL+subNewsLink}">${subNewsTitle}</a>
//     //             </div>
//     //             <span class="byLine">By 
//     //                     <a class="authorLink subNewsLink elementLink" href="${authorLink}" target="_blank">${subNewsAuthor}</a>
//     //             </span>
//     //         </div>
//     //         <a class="subNewsLink elementLink subNewsSource" target="_blank" href="${subNewsSource}">
//     //         <i class="fas fa-external-link-alt external"></i> ${subNewsSourceName}
//     //         </a>
//     //     </div>
//     //     `); // Had to do this in vanilla JS
//     //     subNews.append(subNewsElement);
//     // }
// })

// Youtube
// var youtubeAPIKey = 'AIzaSyCHeOuNp6-T00l_ePO4-OTArWGMBqXkwjQ';
// var youtubeRequestURL = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${youtubeAPIKey}&part=snippet,contentDetails,statistics,status`;
// var youtubeVideoURL = `https://www.youtube.com/watch?v=`;
// var youtubeChannelURL = `https://www.youtube.com/c/`;
// var youtubeListURL = `https://youtube.googleapis.com/youtube/v3/search?key=${youtubeAPIKey}`;

// // Youtube List API
// fetch(youtubeListURL)
// .then(response => {
//     return response.json();
// }).then(data => {
//     console.log('Youtube List API Data Is:');
//     console.log(data);
//     for (var i = 0; i < data.items.length; i++) {
//         var youtube = $('.youtube');
//         var videoID = data.items[i].id.videoId;
//         var videoLink = youtubeVideoURL+data.items[i].id.videoId;
//         console.log(videoLink);
//         var videoElement = $(`
//         <div class="videoElement element">
//             <iframe src="https://www.youtube.com/embed/${videoID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//         </div>
//         `);
//         youtube.append(videoElement);
//     }
// })

// // Youtube Video API
// fetch(youtubeRequestURL)
// .then(response => {
//     return response.json();
// }).then(data => {
//     console.log('Youtube API Data Is:');
//     console.log(data);
// })
