// News Ticker Configuration
const TICKER_CONFIG = {
    scrollSpeed: 50, // pixels per second
    retryInterval: 30000, // 30 seconds
    maxHeadlines: 15,
    defaultSpeed: 2, // Default speed multiplier
    speedLevels: [1, 1.5, 2, 2.5, 3] // Available speed multipliers
};

// Initialize News Ticker
document.addEventListener('DOMContentLoaded', function() {
    initNewsTicker();
});

function initNewsTicker() {
    setupTickerControls();
    fetchRSSFeed();
    // Retry fetching periodically
    setInterval(fetchRSSFeed, TICKER_CONFIG.retryInterval);
}

function setupTickerControls() {
    const controls = document.createElement('div');
    controls.className = 'ticker-controls';
    controls.innerHTML = `
        <div class="ticker-status">
            <div class="status-light"></div>
            <span class="status-text">LIVE</span>
        </div>
        <div class="speed-control">
            <button class="speed-btn decrease">-</button>
            <span class="speed-display">2x</span>
            <button class="speed-btn increase">+</button>
        </div>
    `;
    
    document.querySelector('.news-ticker').appendChild(controls);
    
    // Speed control event listeners
    let currentSpeedIndex = 2; // Start at 2x speed
    const speedDisplay = controls.querySelector('.speed-display');
    
    controls.querySelector('.decrease').addEventListener('click', () => {
        if (currentSpeedIndex > 0) {
            currentSpeedIndex--;
            updateScrollSpeed();
        }
    });
    
    controls.querySelector('.increase').addEventListener('click', () => {
        if (currentSpeedIndex < TICKER_CONFIG.speedLevels.length - 1) {
            currentSpeedIndex++;
            updateScrollSpeed();
        }
    });
    
    function updateScrollSpeed() {
        const speed = TICKER_CONFIG.speedLevels[currentSpeedIndex];
        speedDisplay.textContent = speed + 'x';
        const ticker = document.querySelector('.news-ticker-content');
        ticker.style.animationDuration = (30 / speed) + 's';
    }
}

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
        if (index < TICKER_CONFIG.maxHeadlines) {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const pubDate = new Date(item.querySelector('pubDate').textContent);
            
            // Format each headline with timestamp
            newsContent += `
                <a href="${link}" target="_blank" class="ticker-item">
                    <span class="ticker-time">${formatTickerTime(pubDate)}</span>
                    <span class="ticker-title">${title.toUpperCase()}</span>
                </a>
            `;
        }
    });
    
    updateTickerContent(newsContent);
    updateTickerStatus(true);
}

function displayFallbackNews() {
    const fallbackNews = [
        { title: "SIGNAL LOST - ATTEMPTING TO REESTABLISH CONNECTION", time: "ERROR" },
        { title: "BACKUP SYSTEMS ENGAGED - STANDBY FOR UPDATES", time: "ALERT" },
        { title: "RECONNECTING TO NEWS MAINFRAME...", time: "STATUS" },
        { title: "DIAGNOSTIC: RSS FEED CONNECTION FAILURE", time: "SYSTEM" },
        { title: "RETRYING IN 30 SECONDS...", time: "WAIT" }
    ];
    
    let newsContent = fallbackNews.map(item => `
        <a href="#" class="ticker-item error">
            <span class="ticker-time">${item.time}</span>
            <span class="ticker-title">${item.title}</span>
        </a>
    `).join('');
    
    updateTickerContent(newsContent);
    updateTickerStatus(false);
}

function updateTickerContent(content) {
    const ticker = document.getElementById('tickerContent');
    ticker.innerHTML = content;
    
    // Reset animation
    ticker.style.animation = 'none';
    ticker.offsetHeight; // Trigger reflow
    ticker.style.animation = null;
}

function updateTickerStatus(isLive) {
    const statusLight = document.querySelector('.status-light');
    const statusText = document.querySelector('.status-text');
    
    if (isLive) {
        statusLight.classList.remove('error');
        statusLight.classList.add('live');
        statusText.textContent = 'LIVE';
    } else {
        statusLight.classList.remove('live');
        statusLight.classList.add('error');
        statusText.textContent = 'ERROR';
    }
}

function formatTickerTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Add styles for the enhanced ticker
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .news-ticker {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .ticker-controls {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 0 15px;
            border-left: 1px solid rgba(0, 0, 0, 0.2);
        }
        
        .ticker-status {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .status-light {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #333;
        }
        
        .status-light.live {
            background: #33ff33;
            box-shadow: 0 0 5px #33ff33;
            animation: pulse 2s infinite;
        }
        
        .status-light.error {
            background: #ff3333;
            box-shadow: 0 0 5px #ff3333;
            animation: pulse 0.5s infinite;
        }
        
        .status-text {
            font-weight: bold;
            font-size: 0.8rem;
        }
        
        .speed-control {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .speed-btn {
            background: none;
            border: none;
            color: #000;
            font-weight: bold;
            cursor: pointer;
            padding: 2px 5px;
        }
        
        .speed-btn:hover {
            color: var(--primary-blue);
        }
        
        .speed-display {
            font-weight: bold;
            font-size: 0.8rem;
            min-width: 30px;
            text-align: center;
        }
        
        .ticker-item {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-right: 30px;
            text-decoration: none;
            color: inherit;
        }
        
        .ticker-time {
            font-weight: bold;
            color: var(--primary-blue);
        }
        
        .ticker-title {
            font-weight: bold;
            letter-spacing: 0.5px;
        }
        
        .ticker-item.error {
            color: #ff3333;
        }
        
        .ticker-item.error .ticker-time {
            color: #ff3333;
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    </style>
`);
