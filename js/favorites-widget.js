// Favorites Widget Script
document.addEventListener('DOMContentLoaded', function() {
    setupFavoritesWidget();
});

function setupFavoritesWidget() {
    const favoritesFeed = document.getElementById('favoritesFeed');
    
    // Initialize favorites from localStorage or use defaults
    let favorites = JSON.parse(localStorage.getItem('savedArticles')) || [
        {
            title: "Scientists Discover New Quantum Computing Breakthrough",
            source: "TechNewsToday",
            url: "#",
            timestamp: "2025-02-28T14:32:00",
            excerpt: "Researchers have achieved quantum supremacy with a new 128-qubit processor that outperforms classical supercomputers."
        },
        {
            title: "Global Climate Summit Reaches Historic Agreement",
            source: "WorldNewsNetwork",
            url: "#",
            timestamp: "2025-03-01T09:15:00",
            excerpt: "Nations commit to accelerated carbon neutrality targets and increased funding for renewable energy infrastructure."
        },
        {
            title: "Stock Markets Rally After Federal Reserve Announcement",
            source: "FinancialTimes",
            url: "#",
            timestamp: "2025-03-02T16:45:00",
            excerpt: "Markets respond positively to new interest rate policies designed to combat inflation while supporting growth."
        }
    ];
    
    // Sort favorites by timestamp, newest first
    favorites.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Create HTML for favorites feed
    let favoritesHTML = `
        <div class="favorites-container">
            <div class="favorites-actions">
                <button id="clearFavorites" class="action-button">CLEAR ALL</button>
                <button id="addFavorite" class="action-button">ADD NEW</button>
            </div>
            <div class="favorites-list" id="favoritesList">`;
    
    favorites.forEach((article, index) => {
        const date = new Date(article.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        favoritesHTML += `
            <div class="favorite-article" data-index="${index}">
                <div class="article-header">
                    <span class="article-source">${article.source}</span>
                    <span class="article-date">${date}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-actions">
                    <button class="article-remove" data-index="${index}">REMOVE</button>
                    <a href="${article.url}" target="_blank" class="article-read">READ</a>
                </div>
            </div>
        `;
    });
    
    favoritesHTML += `
            </div>
        </div>
        
        <!-- Favorites Add Modal -->
        <div id="addFavoriteModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Add New Favorite</h3>
                <form id="favoriteForm">
                    <div class="form-group">
                        <label for="articleTitle">Title:</label>
                        <input type="text" id="articleTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="articleSource">Source:</label>
                        <input type="text" id="articleSource" required>
                    </div>
                    <div class="form-group">
                        <label for="articleUrl">URL:</label>
                        <input type="url" id="articleUrl" required>
                    </div>
                    <div class="form-group">
                        <label for="articleExcerpt">Excerpt:</label>
                        <textarea id="articleExcerpt" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="submit-button">SAVE ARTICLE</button>
                </form>
            </div>
        </div>
        
        <style>
            .favorites-container {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .favorites-actions {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            
            .action-button {
                background-color: var(--primary-blue);
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                font-size: 0.7rem;
                text-transform: uppercase;
                transition: background-color 0.3s;
            }
            
            .action-button:hover {
                background-color: var(--primary-orange);
            }
            
            .favorites-list {
                display: flex;
                flex-direction: column;
                gap: 15px;
                max-height: 400px;
                overflow-y: auto;
                padding-right: 5px;
            }
            
            .favorites-list::-webkit-scrollbar {
                width: 5px;
            }
            
            .favorites-list::-webkit-scrollbar-thumb {
                background-color: var(--primary-blue);
                border-radius: 5px;
            }
            
            .favorites-list::-webkit-scrollbar-track {
                background-color: rgba(0, 0, 0, 0.2);
            }
            
            .favorite-article {
                background-color: rgba(0, 30, 60, 0.6);
                padding: 12px;
                border-left: 3px solid var(--primary-orange);
                transition: transform 0.2s, box-shadow 0.2s;
            }
            
            .favorite-article:hover {
                transform: translateX(3px);
                box-shadow: 0 0 10px rgba(244, 125, 48, 0.3);
            }
            
            .article-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
                font-size: 0.7rem;
            }
            
            .article-source {
                color: var(--primary-orange);
                font-weight: bold;
                text-transform: uppercase;
            }
            
            .article-date {
                color: #aaa;
            }
            
            .article-title {
                font-size: 0.9rem;
                margin-bottom: 8px;
                color: var(--light-text);
            }
            
            .article-excerpt {
                font-size: 0.8rem;
                color: #bbb;
                margin-bottom: 10px;
                line-height: 1.4;
            }
            
            .article-actions {
                display: flex;
                justify-content: space-between;
            }
            
            .article-remove, .article-read {
                font-size: 0.7rem;
                padding: 3px 8px;
                cursor: pointer;
                text-transform: uppercase;
                border: none;
                font-family: 'Courier New', monospace;
            }
            
            .article-remove {
                background-color: rgba(200, 0, 0, 0.3);
                color: #ff9999;
            }
            
            .article-remove:hover {
                background-color: rgba(200, 0, 0, 0.5);
            }
            
            .article-read {
                background-color: var(--primary-blue);
                color: white;
                text-decoration: none;
                display: inline-block;
            }
            
            .article-read:hover {
                background-color: var(--primary-orange);
            }
            
            /* Modal Styles */
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
            }
            
            .modal-content {
                background-color: rgba(0, 30, 60, 0.95);
                margin: 10% auto;
                padding: 20px;
                border: 1px solid var(--primary-orange);
                width: 80%;
                max-width: 500px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                position: relative;
            }
            
            .close-modal {
                color: var(--primary-orange);
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                color: var(--light-text);
            }
            
            .form-group input, .form-group textarea {
                width: 100%;
                padding: 8px;
                background-color: rgba(0, 0, 0, 0.3);
                border: 1px solid #444;
                color: var(--light-text);
                font-family: 'Courier New', monospace;
            }
            
            .submit-button {
                background-color: var(--primary-blue);
                color: white;
                border: none;
                padding: 10px 15px;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                text-transform: uppercase;
                font-weight: bold;
                width: 100%;
            }
            
            .submit-button:hover {
                background-color: var(--primary-orange);
            }
        </style>
    `;
    
    favoritesFeed.innerHTML = favoritesHTML;
    
    // Add event listeners
    document.getElementById('clearFavorites').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all saved articles?')) {
            localStorage.removeItem('savedArticles');
            document.getElementById('favoritesList').innerHTML = '<p>No saved articles.</p>';
        }
    });
    
    document.getElementById('addFavorite').addEventListener('click', function() {
        document.getElementById('addFavoriteModal').style.display = 'block';
    });
    
    // Close button in modal
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('addFavoriteModal').style.display = 'none';
        });
    });
    
    // Remove article buttons
    document.querySelectorAll('.article-remove').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            favorites.splice(index, 1);
            localStorage.setItem('savedArticles', JSON.stringify(favorites));
            this.closest('.favorite-article').remove();
        });
    });
    
    // Form submission
    document.getElementById('favoriteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newArticle = {
            title: document.getElementById('articleTitle').value,
            source: document.getElementById('articleSource').value,
            url: document.getElementById('articleUrl').value,
            excerpt: document.getElementById('articleExcerpt').value,
            timestamp: new Date().toISOString()
        };
        
        favorites.unshift(newArticle);
        localStorage.setItem('savedArticles', JSON.stringify(favorites));
        
        // Reset form and close modal
        this.reset();
        document.getElementById('addFavoriteModal').style.display = 'none';
        
        // Refresh the favorites list
        setupFavoritesWidget();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('addFavoriteModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
