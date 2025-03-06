// Social Feeds Script (Instagram and Threads)
document.addEventListener('DOMContentLoaded', function() {
    setupInstagramFeed();
    setupThreadsFeed();
});

// Instagram Feed
function setupInstagramFeed() {
    const instagramFeed = document.getElementById('instagramFeed');
    
    // Sample Instagram posts data (in a real implementation, this would come from the API)
    const instagramPosts = [
        {
            username: 'nasa',
            profilePic: 'https://via.placeholder.com/40',
            imageUrl: 'https://via.placeholder.com/300x300',
            caption: 'Exploring the cosmos one step at a time. #SpaceExploration',
            likes: 45892,
            timestamp: '2 hours ago'
        },
        {
            username: 'nationalgeographic',
            profilePic: 'https://via.placeholder.com/40',
            imageUrl: 'https://via.placeholder.com/300x300',
            caption: 'The wonders of our natural world continue to amaze us. #NaturePhotography',
            likes: 32104,
            timestamp: '5 hours ago'
        },
        {
            username: 'cnn',
            profilePic: 'https://via.placeholder.com/40',
            imageUrl: 'https://via.placeholder.com/300x300',
            caption: 'Breaking news coverage from around the globe. Stay informed.',
            likes: 18743,
            timestamp: '7 hours ago'
        }
    ];
    
    // Create HTML for Instagram feed
    let instagramHTML = '<div class="instagram-container">';
    
    instagramPosts.forEach(post => {
        instagramHTML += `
            <div class="instagram-post">
                <div class="post-header">
                    <img src="${post.profilePic}" alt="${post.username}" class="profile-pic">
                    <div class="username">@${post.username}</div>
                    <div class="timestamp">${post.timestamp}</div>
                </div>
                <div class="post-image-container">
                    <img src="${post.imageUrl}" alt="Post image" class="post-image">
                </div>
                <div class="post-footer">
                    <div class="caption">${post.caption}</div>
                    <div class="likes">♥ ${formatNumber(post.likes)} likes</div>
                </div>
            </div>
        `;
    });
    
    instagramHTML += '</div>';
    
    // Add Instagram-specific styling
    instagramHTML += `
        <style>
            .instagram-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .instagram-post {
                background-color: rgba(0, 30, 60, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 5px;
                overflow: hidden;
            }
            
            .post-header {
                display: flex;
                align-items: center;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.2);
            }
            
            .profile-pic {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                margin-right: 10px;
            }
            
            .username {
                font-weight: bold;
                font-size: 0.8rem;
                color: var(--light-text);
            }
            
            .timestamp {
                margin-left: auto;
                font-size: 0.7rem;
                color: #aaa;
            }
            
            .post-image-container {
                width: 100%;
                position: relative;
                overflow: hidden;
            }
            
            .post-image {
                width: 100%;
                height: auto;
                display: block;
                transition: transform 0.3s ease;
            }
            
            .post-image:hover {
                transform: scale(1.03);
            }
            
            .post-footer {
                padding: 10px;
            }
            
            .caption {
                font-size: 0.8rem;
                margin-bottom: 5px;
                color: var(--light-text);
            }
            
            .likes {
                font-size: 0.7rem;
                color: var(--primary-orange);
            }
        </style>
    `;
    
    instagramFeed.innerHTML = instagramHTML;
}

// Threads.net Feed
function setupThreadsFeed() {
    const threadsFeed = document.getElementById('threadsFeed');
    
    // Sample Threads.net posts data
    const threadsPosts = [
        {
            username: 'markzuckerberg',
            profilePic: 'https://via.placeholder.com/40',
            content: 'Excited to announce our latest tech innovations coming next quarter! #TechNews',
            replies: 1243,
            likes: 8921,
            timestamp: '3 hours ago'
        },
        {
            username: 'elonmusk',
            profilePic: 'https://via.placeholder.com/40',
            content: 'The future of transportation is electric. Working on some groundbreaking tech that will change everything.',
            replies: 3568,
            likes: 24752,
            timestamp: '6 hours ago'
        },
        {
            username: 'billgates',
            profilePic: 'https://via.placeholder.com/40',
            content: 'Climate change remains our biggest challenge. Here\'s what we can do about it now.',
            replies: 982,
            likes: 11456,
            timestamp: '12 hours ago'
        }
    ];
    
    // Create HTML for Threads feed
    let threadsHTML = '<div class="threads-container">';
    
    threadsPosts.forEach(post => {
        threadsHTML += `
            <div class="thread-post">
                <div class="thread-profile">
                    <img src="${post.profilePic}" alt="${post.username}" class="thread-pic">
                    <div class="thread-user-info">
                        <div class="thread-username">@${post.username}</div>
                        <div class="thread-timestamp">${post.timestamp}</div>
                    </div>
                </div>
                <div class="thread-content">${post.content}</div>
                <div class="thread-stats">
                    <span class="thread-replies">💬 ${formatNumber(post.replies)}</span>
                    <span class="thread-likes">♥ ${formatNumber(post.likes)}</span>
                </div>
            </div>
        `;
    });
    
    threadsHTML += '</div>';
    
    // Add Threads-specific styling
    threadsHTML += `
        <style>
            .threads-container {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .thread-post {
                background-color: rgba(0, 30, 60, 0.6);
                border-radius: 8px;
                padding: 15px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            
            .thread-post:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .thread-profile {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .thread-pic {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
                border: 1px solid var(--primary-orange);
            }
            
            .thread-user-info {
                display: flex;
                flex-direction: column;
            }
            
            .thread-username {
                font-weight: bold;
                font-size: 0.9rem;
                color: var(--light-text);
            }
            
            .thread-timestamp {
                font-size: 0.7rem;
                color: #aaa;
            }
            
            .thread-content {
                font-size: 0.9rem;
                line-height: 1.4;
                margin-bottom: 10px;
                color: var(--light-text);
            }
            
            .thread-stats {
                display: flex;
                gap: 15px;
                font-size: 0.8rem;
                color: #aaa;
            }
            
            .thread-replies, .thread-likes {
                display: flex;
                align-items: center;
            }
        </style>
    `;
    
    threadsFeed.innerHTML = threadsHTML;
}
