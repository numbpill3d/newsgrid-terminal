// Reddit Feed Script
document.addEventListener('DOMContentLoaded', function() {
    fetchRedditPosts();
});

async function fetchRedditPosts() {
    try {
        // Fetch the r/politics subreddit JSON feed
        const response = await fetch('https://www.reddit.com/r/politics/hot.json?limit=10');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        displayRedditPosts(data.data.children);
    } catch (error) {
        console.error('Error fetching Reddit posts:', error);
        displayFallbackRedditPosts();
    }
}

function displayRedditPosts(posts) {
    const redditFeed = document.getElementById('redditFeed');
    let postsHTML = '<div class="reddit-posts">';
    
    posts.forEach(post => {
        const postData = post.data;
        const title = postData.title;
        const url = 'https://www.reddit.com' + postData.permalink;
        const author = postData.author;
        const score = postData.score;
        const commentCount = postData.num_comments;
        
        // Format each post
        postsHTML += `
            <div class="reddit-post">
                <h3 class="post-title">
                    <a href="${url}" target="_blank">${title}</a>
                </h3>
                <div class="post-meta">
                    <span class="post-author">Posted by u/${author}</span>
                    <span class="post-score">▲ ${formatNumber(score)}</span>
                    <span class="post-comments">💬 ${formatNumber(commentCount)}</span>
                </div>
            </div>
        `;
    });
    
    postsHTML += '</div>';
    
    // Add Reddit-specific styling
    postsHTML += `
        <style>
            .reddit-posts {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .reddit-post {
                padding: 10px;
                background-color: rgba(0, 30, 60, 0.6);
                border-left: 3px solid var(--primary-orange);
                transition: all 0.3s ease;
            }
            
            .reddit-post:hover {
                background-color: rgba(0, 40, 80, 0.8);
                box-shadow: 0 0 10px rgba(244, 125, 48, 0.3);
            }
            
            .post-title {
                font-size: 0.9rem;
                margin-bottom: 8px;
            }
            
            .post-title a {
                color: var(--light-text);
                text-decoration: none;
                transition: color 0.3s;
            }
            
            .post-title a:hover {
                color: var(--primary-orange);
                text-decoration: underline;
            }
            
            .post-meta {
                display: flex;
                font-size: 0.75rem;
                color: #aaa;
                gap: 10px;
            }
            
            .post-author, .post-score, .post-comments {
                display: flex;
                align-items: center;
            }
        </style>
    `;
    
    redditFeed.innerHTML = postsHTML;
}

function displayFallbackRedditPosts() {
    const redditFeed = document.getElementById('redditFeed');
    
    redditFeed.innerHTML = `
