// Social Feeds Configuration
const SOCIAL_CONFIG = {
    refreshInterval: 60000, // 1 minute
    maxPosts: 5,
    defaultAvatarUrl: 'https://via.placeholder.com/40'
};

// Initialize Social Feeds
document.addEventListener('DOMContentLoaded', function() {
    initializeSocialFeeds();
});

function initializeSocialFeeds() {
    setupBlueskyFeed();
    setupThreadsFeed();
    // Auto refresh feeds
    setInterval(() => {
        setupBlueskyFeed();
        setupThreadsFeed();
    }, SOCIAL_CONFIG.refreshInterval);
}

// Bluesky Feed
function setupBlueskyFeed() {
    const blueskyFeed = document.getElementById('instagramFeed'); // Using existing container
    
    // Sample Bluesky posts data (in a real implementation, this would come from the API)
    const blueskyPosts = [
        {
            username: 'WhiteHouse.bsky.social',
            displayName: 'The White House',
            profilePic: SOCIAL_CONFIG.defaultAvatarUrl,
            content: 'LIVE: President\'s address on infrastructure and economic growth. Watch now at whitehouse.gov/live',
            reposts: 1289,
            likes: 3421,
            timestamp: '18:30 EST',
            verified: true
        },
        {
            username: 'Reuters.bsky.social',
            displayName: 'Reuters News',
            profilePic: SOCIAL_CONFIG.defaultAvatarUrl,
            content: 'BREAKING: Global markets respond to latest economic indicators. Full analysis: [link]',
            reposts: 892,
            likes: 2145,
            timestamp: '18:15 EST',
            verified: true
        },
        {
            username: 'Congress.bsky.social',
            displayName: 'Congressional Updates',
            profilePic: SOCIAL_CONFIG.defaultAvatarUrl,
            content: 'House passes bipartisan bill on cybersecurity measures. Details on the new provisions:',
            reposts: 567,
            likes: 1893,
            timestamp: '17:45 EST',
            verified: true
        }
    ];
    
    // Create HTML for Bluesky feed
    let blueskyHTML = `
        <div class="social-feed-container">
            <div class="feed-header">
                <div class="feed-status">
                    <div class="status-light live"></div>
                    <span>LIVE UPDATES</span>
                </div>
                <div class="feed-timestamp">${getCurrentTime()}</div>
            </div>
            <div class="feed-content">
    `;
    
    blueskyPosts.forEach(post => {
        blueskyHTML += `
            <div class="social-post bluesky-post">
                <div class="post-header">
                    <div class="user-info">
                        <img src="${post.profilePic}" alt="${post.displayName}" class="profile-pic">
                        <div class="user-details">
                            <div class="display-name">
                                ${post.displayName}
                                ${post.verified ? '<span class="verified-badge">✓</span>' : ''}
                            </div>
                            <div class="username">@${post.username}</div>
                        </div>
                    </div>
                    <div class="post-time">${post.timestamp}</div>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-stats">
                    <span class="stat-item">
                        <span class="stat-icon">↺</span>
                        ${formatNumber(post.reposts)}
                    </span>
                    <span class="stat-item">
                        <span class="stat-icon">♥</span>
                        ${formatNumber(post.likes)}
                    </span>
                </div>
            </div>
        `;
    });
    
    blueskyHTML += `
            </div>
        </div>
        ${generateSocialStyles()}
    `;
    
    blueskyFeed.innerHTML = blueskyHTML;
}

// Threads.net Feed
function setupThreadsFeed() {
    const threadsFeed = document.getElementById('threadsFeed');
    
    // Sample Threads.net posts data focused on news/politics
    const threadsPosts = [
        {
            username: 'BBCNews',
            displayName: 'BBC News',
            profilePic: SOCIAL_CONFIG.defaultAvatarUrl,
            content: 'DEVELOPING: Major diplomatic breakthrough in international peace talks. Follow our live coverage.',
            replies: 2341,
            likes: 8765,
            timestamp: '19:15 EST',
            verified: true
        },
        {
            username: 'TheEconomist',
            displayName: 'The Economist',
            profilePic: SOCIAL_CONFIG.defaultAvatarUrl,
            content: 'Analysis: How artificial intelligence is reshaping global financial markets and policy decisions.',
            replies: 1567,
            likes: 6234,
            timestamp: '18:45 EST',
            verified: true
        },
        {
            username: 'ForeignPolicy',
            displayName: 'Foreign Policy',
            profilePic: SOCIAL_CONFIG.defaultAvatarUrl,
            content: 'NEW: Special report on emerging geopolitical challenges and their impact on global security.',
            replies: 892,
            likes: 4532,
            timestamp: '18:20 EST',
            verified: true
        }
    ];
    
    // Create HTML for Threads feed
    let threadsHTML = `
        <div class="social-feed-container">
            <div class="feed-header">
                <div class="feed-status">
                    <div class="status-light live"></div>
                    <span>LIVE UPDATES</span>
                </div>
                <div class="feed-timestamp">${getCurrentTime()}</div>
            </div>
            <div class="feed-content">
    `;
    
    threadsPosts.forEach(post => {
        threadsHTML += `
            <div class="social-post thread-post">
                <div class="post-header">
                    <div class="user-info">
                        <img src="${post.profilePic}" alt="${post.displayName}" class="profile-pic">
                        <div class="user-details">
                            <div class="display-name">
                                ${post.displayName}
                                ${post.verified ? '<span class="verified-badge">✓</span>' : ''}
                            </div>
                            <div class="username">@${post.username}</div>
                        </div>
                    </div>
                    <div class="post-time">${post.timestamp}</div>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-stats">
                    <span class="stat-item">
                        <span class="stat-icon">💬</span>
                        ${formatNumber(post.replies)}
                    </span>
                    <span class="stat-item">
                        <span class="stat-icon">♥</span>
                        ${formatNumber(post.likes)}
                    </span>
                </div>
            </div>
        `;
    });
    
    threadsHTML += `
            </div>
        </div>
    `;
    
    threadsFeed.innerHTML = threadsHTML;
}

function generateSocialStyles() {
    return `
        <style>
            .social-feed-container {
                background: rgba(0, 20, 40, 0.9);
                border: 1px solid var(--primary-blue);
                border-radius: 5px;
                overflow: hidden;
            }
            
            .feed-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: rgba(0, 30, 60, 0.8);
                border-bottom: 1px solid var(--primary-orange);
            }
            
            .feed-status {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.8rem;
                font-weight: bold;
                color: var(--light-text);
            }
            
            .status-light {
                width: 8px;
                height: 8px;
                border-radius: 50%;
            }
            
            .status-light.live {
                background: #33ff33;
                box-shadow: 0 0 5px #33ff33;
                animation: pulse 2s infinite;
            }
            
            .feed-timestamp {
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                color: var(--primary-orange);
            }
            
            .feed-content {
                padding: 15px;
                max-height: 500px;
                overflow-y: auto;
            }
            
            .social-post {
                background: rgba(0, 30, 60, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 5px;
                padding: 15px;
                margin-bottom: 15px;
                transition: transform 0.2s ease;
            }
            
            .social-post:hover {
                transform: translateX(5px);
                border-left: 3px solid var(--primary-orange);
            }
            
            .post-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 10px;
            }
            
            .user-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .profile-pic {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                border: 2px solid var(--primary-blue);
            }
            
            .user-details {
                display: flex;
                flex-direction: column;
            }
            
            .display-name {
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--light-text);
                font-weight: bold;
                font-size: 0.9rem;
            }
            
            .verified-badge {
                color: var(--primary-blue);
                font-size: 0.8rem;
            }
            
            .username {
                color: #aaa;
                font-size: 0.8rem;
            }
            
            .post-time {
                font-family: 'Courier New', monospace;
                font-size: 0.7rem;
                color: var(--primary-orange);
            }
            
            .post-content {
                color: var(--light-text);
                font-size: 0.9rem;
                line-height: 1.4;
                margin-bottom: 10px;
                padding: 5px 0;
            }
            
            .post-stats {
                display: flex;
                gap: 15px;
                color: #aaa;
                font-size: 0.8rem;
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .stat-icon {
                color: var(--primary-blue);
            }
            
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            
            /* Scrollbar styling */
            .feed-content::-webkit-scrollbar {
                width: 8px;
            }
            
            .feed-content::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
            }
            
            .feed-content::-webkit-scrollbar-thumb {
                background: var(--primary-blue);
                border-radius: 4px;
            }
            
            .feed-content::-webkit-scrollbar-thumb:hover {
                background: var(--primary-orange);
            }
        </style>
    `;
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

function getCurrentTime() {
    return new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }) + ' EST';
}