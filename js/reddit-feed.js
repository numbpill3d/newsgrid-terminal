// Reddit Feed Configuration
const REDDIT_CONFIG = {
    subreddit: 'politics',
    refreshInterval: 300000, // 5 minutes
    postLimit: 10,
    retryAttempts: 3,
    retryDelay: 5000, // 5 seconds
    sortOptions: ['hot', 'new', 'top', 'rising']
};

// Reddit Feed Script
document.addEventListener('DOMContentLoaded', function() {
    initRedditFeed();
});

async function initRedditFeed() {
    // Initial fetch
    await fetchRedditPosts();
    
    // Set up auto-refresh
    setInterval(fetchRedditPosts, REDDIT_CONFIG.refreshInterval);
    
    // Initialize sort controls
    setupSortControls();
}

function setupSortControls() {
    const redditFeed = document.getElementById('redditFeed');
    const controls = document.createElement('div');
    controls.className = 'reddit-controls';
    
    controls.innerHTML = `
        <select class="sort-select" aria-label="Sort posts by">
            ${REDDIT_CONFIG.sortOptions.map(option => 
                `<option value="${option}">${option.toUpperCase()}</option>`
            ).join('')}
        </select>
    `;
    
    redditFeed.insertBefore(controls, redditFeed.firstChild);
    
    // Add event listener
    controls.querySelector('.sort-select').addEventListener('change', (e) => {
        fetchRedditPosts(e.target.value);
    });
}

async function fetchRedditPosts(sort = 'hot') {
    showLoadingState();
    
    let attempts = 0;
    let success = false;
    
    while (attempts < REDDIT_CONFIG.retryAttempts && !success) {
        try {
            const response = await fetch(
                `https://www.reddit.com/r/${REDDIT_CONFIG.subreddit}/${sort}.json?limit=${REDDIT_CONFIG.postLimit}`
            );
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            displayRedditPosts(data.data.children);
            success = true;
        } catch (error) {
            console.error(`Attempt ${attempts + 1} failed:`, error);
            attempts++;
            
            if (attempts < REDDIT_CONFIG.retryAttempts) {
                await new Promise(resolve => setTimeout(resolve, REDDIT_CONFIG.retryDelay));
            }
        }
    }
    
    if (!success) {
        displayFallbackRedditPosts();
    }
    
    hideLoadingState();
}

function displayRedditPosts(posts) {
    const redditFeed = document.getElementById('redditFeed');
    let postsHTML = '<div class="reddit-posts">';
    
    posts.forEach(post => {
        const postData = post.data;
        const title = truncateText(postData.title, 120);
        const url = postData.url;
        const redditUrl = 'https://www.reddit.com' + postData.permalink;
        const author = postData.author;
        const score = postData.score;
        const commentCount = postData.num_comments;
        const timestamp = formatTimestamp(postData.created_utc);
        
        // Format each post with retro styling
        postsHTML += `
            <div class="reddit-post">
                <div class="post-header">
                    <span class="post-score">▲ ${formatNumber(score)}</span>
                    <span class="post-time">${timestamp}</span>
                </div>
                <h3 class="post-title">
                    <a href="${url}" target="_blank" class="external-link">${title}</a>
                    <a href="${redditUrl}" target="_blank" class="reddit-link" title="View on Reddit">
                        <span class="reddit-icon">r/</span>
                    </a>
                </h3>
                <div class="post-meta">
                    <span class="post-author">Posted by u/${author}</span>
                    <span class="post-comments">
                        <span class="icon">💬</span> ${formatNumber(commentCount)}
                    </span>
                </div>
            </div>
        `;
    });
    
    postsHTML += '</div>';
    
    // Add Reddit-specific retro styling
    postsHTML += `
        <style>
            .reddit-controls {
                margin-bottom: 15px;
                padding: 10px;
                background: rgba(0, 30, 60, 0.6);
                border-radius: 5px;
            }
            
            .sort-select {
                background: var(--primary-blue);
                color: white;
                border: 1px solid var(--primary-orange);
                padding: 5px 10px;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                text-transform: uppercase;
            }
            
            .sort-select:hover {
                background: var(--primary-orange);
            }
            
            .reddit-posts {
                display: flex;
                flex-direction: column;
                gap: 15px;
                max-height: 600px;
                overflow-y: auto;
                padding-right: 10px;
            }
            
            .reddit-post {
                padding: 15px;
                background: rgba(0, 30, 60, 0.6);
                border: 1px solid var(--primary-blue);
                border-left: 3px solid var(--primary-orange);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .reddit-post::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    45deg,
                    transparent 0%,
                    rgba(244, 125, 48, 0.1) 50%,
                    transparent 100%
                );
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .reddit-post:hover::before {
                opacity: 1;
            }
            
            .post-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                font-size: 0.8rem;
                color: #aaa;
            }
            
            .post-title {
                font-size: 0.9rem;
                margin-bottom: 8px;
                line-height: 1.4;
            }
            
            .post-title a {
                color: var(--light-text);
                text-decoration: none;
                transition: color 0.3s;
            }
            
            .post-title a:hover {
                color: var(--primary-orange);
            }
            
            .reddit-link {
                margin-left: 8px;
                font-size: 0.8rem;
                opacity: 0.7;
                transition: opacity 0.3s;
            }
            
            .reddit-link:hover {
                opacity: 1;
            }
            
            .post-meta {
                display: flex;
                font-size: 0.75rem;
                color: #aaa;
                gap: 15px;
                align-items: center;
            }
            
            .post-author, .post-score, .post-comments {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .loading {
                text-align: center;
                padding: 20px;
                color: var(--primary-orange);
                font-style: italic;
                animation: pulse 1s infinite;
            }
            
            @keyframes pulse {
                0% { opacity: 0.5; }
                50% { opacity: 1; }
                100% { opacity: 0.5; }
            }
        </style>
    `;
    
    redditFeed.innerHTML = postsHTML;
}

function displayFallbackRedditPosts() {
    const redditFeed = document.getElementById('redditFeed');
    
    const fallbackPosts = [
        {
            title: "SYSTEM ERROR: UNABLE TO CONNECT TO REDDIT SERVER",
            author: "SYSTEM",
            score: 0,
            comments: 0,
            time: "NOW"
        },
        {
            title: "ATTEMPTING TO ESTABLISH CONNECTION...",
            author: "SYSTEM",
            score: 0,
            comments: 0,
            time: "NOW"
        },
        {
            title: "CHECK NETWORK CONNECTIVITY",
            author: "SYSTEM",
            score: 0,
            comments: 0,
            time: "NOW"
        }
    ];
    
    let postsHTML = '<div class="reddit-posts">';
    
    fallbackPosts.forEach(post => {
        postsHTML += `
            <div class="reddit-post system-message">
                <h3 class="post-title">${post.title}</h3>
                <div class="post-meta">
                    <span class="post-author">Posted by ${post.author}</span>
                    <span class="post-time">${post.time}</span>
                </div>
            </div>
        `;
    });
    
    postsHTML += '</div>';
    redditFeed.innerHTML = postsHTML;
}

function showLoadingState() {
    const redditFeed = document.getElementById('redditFeed');
    redditFeed.innerHTML = '<div class="loading">ACCESSING R/POLITICS MAINFRAME...</div>';
}

function hideLoadingState() {
    // Loading state will be replaced by content
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = (now - date) / 1000;
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h';
    if (diff < 2592000) return Math.floor(diff / 86400) + 'd';
    
    return date.toLocaleDateString();
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength - 3) + '...';
}