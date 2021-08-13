// Variables
var newsColumns = $('.newsColumn');

// var animation = bodymovin.loadAnimation({
//     container: document.getElementById('bm'),
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: './assets/js/data.json'
//   })

var animation = bodymovin.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://labs.nearpod.com/bodymovin/demo/markus/isometric/markus2.json'
  })

  

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
    let descriptionArchives = [];
    let nationalArchives = $('.nationalArchives');
    for (var i = 0; i < data.opaResponse.results.result.length; i++) {
        let archiveType = data.opaResponse.results.result[i].type;
        if (archiveType === 'description') {
            let archiveTitle = data.opaResponse.results.result[i].description.item.parentFileUnit.title;
            let archiveSubTitle = data.opaResponse.results.result[i].description.item.title;
            let archivePDF = data.opaResponse.results.result[i].objects.object.file['@url'];
            let archivePDFThumb = data.opaResponse.results.result[i].objects.object.thumbnail['@url'];
            let archive = {
                title: archiveTitle,
                subtitle: archiveSubTitle,
                thumb: archivePDFThumb,
                pdf: archivePDF
            }
            descriptionArchives.push(archive);
            // console.log(descriptionArchives);
        }
    } // Creating Archive Description Elements
    descriptionArchives.forEach((archive,index) => {
        var naElement = $(`
            <div class="naElement element">
                <div class="naTitle elementTitle">
                    <div class="titleRow">
                        <span class="index">${index+1 + '. '}</span>
                        <a class="naLink elementLink" target="_blank" href="${archive.pdf}">${archive.subtitle}<div class="subTitle">${archive.title}</div></a>
                    </div>
                    <span class="byLine"> 
                        <a class="authorLink naLink elementLink" href="" target="_blank"></a>
                    </span>
                </div>
                <a class="naImageLink elementLink naImageSource" target="_blank" href="${archive.pdf}">
                    <img class="naImage" src="${archive.thumb}">
                </a>
            </div>
        `);
        nationalArchives.append(naElement);
    })
    
})

// Fetching Nasa Images
var nasaKey = `wC0OktvMTSEtJByir363uFfuw3YhKmezYxfQ1BGq`;
var nasaImageSearchTerms = ['planet','star','galaxy'];
var x = Math.floor(Math.random() * nasaImageSearchTerms.length);
var nasaImagesSearch = `https://images-api.nasa.gov/search?q=${nasaImageSearchTerms[x]}`;

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
        var nasaImage = data.collection.items[i].links[0].href;
        // var nasaSideFetch = data.collection.items[i].href;
        // fetch(nasaSideFetch).then(newResponse => {return newResponse.json()}).then((linkData,nasaImage) => {
        //         var nasaImageArray = filterImageGallery(linkData,'.jpg');
        //         console.log(nasaImageArray);
        //         localStorage.setItem('Nasa Images', JSON.stringify(nasaImageArray));
        //         // var nasaVideoArray = filterImageGallery(linkData,'.mp4');
        //         var nasaImages = JSON.parse(localStorage.getItem('Nasa Images')) || [];
        //         function filterImageGallery(array, query) {
        //             return array.filter(function(jpg) {
        //                 return jpg.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        //         })
        //     }
        // })
        var nasaImageElement = $(`
            <div class="nasaImageElement element">
                <div class="nasaImageTitle elementTitle">
                    <div class="titleRow">
                        <span class="index">${i+1 + '. '}</span>
                        <a class="nasaImageLink elementLink" target="_blank" href="${nasaImage}">${nasaImageTitle}</a>
                    </div>
                    <span class="byLine"></span>
                </div>
                 <a class="nasaImageLink elementLink nasaImageSource" target="_blank" href="${nasaImage}">
                     <img class="nasaImage" src="${nasaImage}">
                 </a>
            </div>
             `);
        nasa.append(nasaImageElement);
    }
})


// Reddit Memes
var redditMemeRequestURL = 'https://www.reddit.com/r/memes/new.json?limit=10';

// // Reddit Memes Fetch
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

// Generating Weather
var weatherAPIKey = 'ce5300e7acaa327ad655b8a21d5130d8';
var cities = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
var x = Math.floor(Math.random() * cities.length) + 1;
var city = cities[x];
console.log(city);
var weatherRequestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`;

// Weather Fetch
fetch(weatherRequestURL)
.then(response => {
    return response.json();
}).then(data => {
    console.log('Weather Data Is ');
    console.log(data);
    // Initializing Coords
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    // Reinitializing new map
    function initmap(){
        var options = {
            zoom: 9,
            center: {lat:lat,lng:lon}
        } // Map Options
        var map = new google.maps.Map(document.getElementById('map'),options);
    } // Reinvoking Map with new Coords
    initmap();
    var latlonLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
    fetch(latlonLink)
    .then(response => {
        return response.json();
    }).then(data => {
        console.log('Weather Lat Lon Data Is ');
        console.log(data);
        var weather = $('.weather');
        var weatherLocation = weather.find('.location');
        for (var i = 0; i < data.daily.length; i++) {
            var day = moment.unix(data.daily[i].dt).format('dddd');
            var fahrenheit = Math.floor((data.daily[i].temp.max - 273.15)* 1.8 + 32.00);
            var UVIndex = data.daily[i].uvi;
            var windSpeed = data.daily[i].wind_speed;
            var mainIcon = data.daily[0].weather[0].icon;
            var mainIconLink = `https://openweathermap.org/img/wn/${mainIcon}@2x.png`;
            var weatherElement = $(`
            <div class="weatherElement element">
                <div class="titleRow">
                    <div class="weatherTitle elementTitle">
                        ${day} Daily Forecast
                    </div>
                </div>
                <div class="statsRow">
                    <div class="stats">
                        <span class="temperature">- Temperature: ${fahrenheit + '° F'}</span>
                        <span class="UVI">- UV Index: ${UVIndex}</span>
                        <span class="windSpeed">- Wind Speed: ${windSpeed}mph</span>
                    </div>
                    <img class="iconImage" src="${mainIconLink}">
                </div>
            </div>
            `);
            weather.append(weatherElement);
        }
        weatherLocation.html(city + ' ');
    })
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

// Youtube
var youtubeKey = `AIzaSyA16vPDPSbXbys1NE6HlCCT-Myx4tgo0NU`;
var youtubeRequest = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US&key=${youtubeKey}`;

// Fetching Youtube
fetch(youtubeRequest)
.then(response => {
    return response.json();
}).then(data => {
    console.log(`Youtube API Data Is:`);
    console.log(data);
    let youtube = $('.youtube');
    for (var i = 0; i < data.items.length; i++) {
        let videoTitle = data.items[i].snippet.title;
        let videoID = data.items[i].id;
        let videoChannelName = data.items[i].snippet.channelTitle;
        let videoChannelID = data.items[i].snippet.channelId;
        let videoThumbnail = data.items[i].snippet.thumbnails.high.url;
        let videoURL = `https://www.youtube.com/watch?v=${videoID}&ab_channel=${videoChannelName}`;
        let videoChannelURL = `https://www.youtube.com/channel/${videoChannelID}`;
        var videoElement = $(`
        <div class="videoElement element">
            <div class="titleRow">
                <div class="videoTitle elementTitle">
                    <span class="index">${i+1 + '. '}</span>
                    <a class="articleLink elementLink" target="_blank" href="${videoURL}">${videoTitle}</a>
                </div>
            </div>
            <span class="byLine">By 
                <a class="articleLink elementLink" target="_blank" href="${videoChannelURL}">${videoChannelName}</a>
            </span>
            <a class="videoLink elementLink videoImageLink" target="_blank" href="${videoURL}">
                <img class="videoImage" src="${videoThumbnail}">
            </a>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `);
        youtube.append(videoElement);
    }
})


// Deprecated

// ABC
// var abcRequestURL = `https://api.abc.com/resources/.json?limit=24`;
//    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

        // nasaImageTitles.push(nasaImageTitle);
        // nasaImageTitles.splice(100);
        // localStorage.setItem('Nasa Titles',JSON.stringify(nasaImageTitles));
        // var nasaSideFetch = data.collection.items[i].href;
        // fetch(nasaSideFetch).then(newResponse => {return newResponse.json()}).then((linkData,nasaImage) => {
        //     var nasaImageArray = filterImageGallery(linkData,'.jpg');
        //     var nasaLargeImage = nasaImageArray[0];
        //     var nasaVideoArray = filterImageGallery(linkData,'.mp4');
        //     var nasaVideo = nasaVideoArray[0];
        //     var nasaImageTitles = JSON.parse(localStorage.getItem('Nasa Titles')) || [];
        //     console.log(nasaImageTitles);
        //     var nasaImageElement = $(`
        //     <div class="nasaImageElement element">
        //         <a class="nasaImageLink elementLink nasaImageSource" target="_blank" href="${nasaLargeImage}">
        //             <img class="nasaImage" src="${nasaLargeImage}">
        //         </a>
        //     </div>
        //     `);
        //     localStorage.setItem('Nasa Image Links',JSON.stringify(nasaImageArray));
        //     localStorage.setItem('Nasa Video Links',JSON.stringify(nasaVideoArray));
        //     function filterImageGallery(array, query) {
        //         return array.filter(function(jpg) {
        //             return jpg.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        //         })
        //     }
        // })
