// News Ticker Script
document.addEventListener('DOMContentLoaded', function() {
    fetchRSSFeed();
});

async function fetchRSSFeed() {
    try {
        // Use a CORS proxy to access the RSS feed
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const rssUrl = 'https://rssfeeds.usatoday.com/usatoday-NewsTopStories';
        const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.text();
        parseRSS(data);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        // Fallback content in case of error
        displayFallbackNews();
    }
}

function parseRSS(data) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const items = xml.querySelectorAll('item');
    
    let newsContent = '';
    
    // Extract headlines from the RSS feed
    items.forEach((item, index) => {
        if (index < 15) { // Limit to 15 headlines
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            
            // Format each headline as a link
            newsContent += `<a href="${link}" target="_blank">${title.toUpperCase()}</a>`;
        }
    });
    
    // Update the ticker content
    document.getElementById('tickerContent').innerHTML = newsContent;
}

function displayFallbackNews() {
    // Fallback news headlines if the RSS feed fails
    const fallbackNews = [
        { title: "SYSTEM ERROR: NEWS FEED UNAVAILABLE", link: "#" },
        { title: "ATTEMPTING TO RECONNECT TO NEWS SERVER", link: "#" },
        { title: "PLEASE STAND BY FOR LIVE UPDATES", link: "#" },
        { title: "NETWORK CONNECTION INTERRUPTED", link: "#" },
        { title: "RSS FEED TEMPORARILY OFFLINE", link: "#" }
    ];
    
    let newsContent = '';
    
    fallbackNews.forEach(item => {
        newsContent += `<a href="${item.link}">${item.title}</a>`;
    });
    
    document.getElementById('tickerContent').innerHTML = newsContent;
}
