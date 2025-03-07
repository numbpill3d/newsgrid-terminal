// Favorites Widget Configuration
const FAVORITES_CONFIG = {
    maxArticles: 50,
    categories: ['Politics', 'Technology', 'Economy', 'World News', 'Opinion'],
    sortOptions: ['newest', 'oldest', 'alphabetical'],
    defaultSort: 'newest'
};

// Initialize Favorites Widget
document.addEventListener('DOMContentLoaded', function() {
    initFavoritesWidget();
});

function initFavoritesWidget() {
    const container = document.getElementById('favoritesFeed');
    setupFavoritesWidget(container);
}

function setupFavoritesWidget(container) {
    // Load favorites from localStorage
    let favorites = loadFavorites();
    
    let html = `
        <div class="favorites-container tv-frame">
            <div class="favorites-header">
                <div class="header-controls">
                    <input type="text" id="searchFavorites" placeholder="SEARCH ARTICLES..." class="search-input">
                    <select id="sortFavorites" class="sort-select">
                        ${FAVORITES_CONFIG.sortOptions.map(option => 
                            `<option value="${option}">${option.toUpperCase()}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="header-actions">
                    <button id="importFavorites" class="action-button">IMPORT</button>
                    <button id="exportFavorites" class="action-button">EXPORT</button>
                    <button id="addFavorite" class="action-button primary">ADD NEW</button>
                </div>
            </div>

            <div class="favorites-content">
                <div class="favorites-list" id="favoritesList">
                    ${renderFavoritesList(favorites)}
                </div>
                <div class="status-bar">
                    <span class="article-count">${favorites.length} ARTICLES SAVED</span>
                    <button id="clearFavorites" class="danger-button">CLEAR ALL</button>
                </div>
            </div>
        </div>

        <!-- Add/Edit Modal -->
        ${generateModal()}
        
        ${generateFavoritesStyles()}
    `;

    container.innerHTML = html;
    initializeEventListeners(favorites);
}

function renderFavoritesList(favorites) {
    if (favorites.length === 0) {
        return `
            <div class="empty-state">
                <p>NO SAVED ARTICLES</p>
                <p class="subtitle">Use the ADD NEW button to save articles</p>
            </div>
        `;
    }

    return favorites.map((article, index) => `
        <div class="favorite-article" data-index="${index}">
            <div class="article-header">
                <div class="article-meta">
                    <span class="article-source">${article.source}</span>
                    <span class="article-category">${article.category || 'Uncategorized'}</span>
                </div>
                <span class="article-date">${formatDate(article.timestamp)}</span>
            </div>
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-tags">
                ${(article.tags || []).map(tag => 
                    `<span class="tag">${tag}</span>`
                ).join('')}
            </div>
            <div class="article-actions">
                <button class="article-edit" data-index="${index}">EDIT</button>
                <button class="article-remove" data-index="${index}">REMOVE</button>
                <a href="${article.url}" target="_blank" class="article-read">READ</a>
            </div>
        </div>
    `).join('');
}

function generateModal() {
    return `
        <div id="favoriteModal" class="modal">
            <div class="modal-content tv-frame">
                <div class="modal-header">
                    <h3 id="modalTitle">ADD NEW ARTICLE</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <form id="favoriteForm">
                    <div class="form-group">
                        <label for="articleTitle">TITLE:</label>
                        <input type="text" id="articleTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="articleSource">SOURCE:</label>
                        <input type="text" id="articleSource" required>
                    </div>
                    <div class="form-group">
                        <label for="articleCategory">CATEGORY:</label>
                        <select id="articleCategory">
                            ${FAVORITES_CONFIG.categories.map(category =>
                                `<option value="${category}">${category}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="articleUrl">URL:</label>
                        <input type="url" id="articleUrl" required>
                    </div>
                    <div class="form-group">
                        <label for="articleExcerpt">EXCERPT:</label>
                        <textarea id="articleExcerpt" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="articleTags">TAGS (comma-separated):</label>
                        <input type="text" id="articleTags">
                    </div>
                    <input type="hidden" id="articleId">
                    <button type="submit" class="submit-button">SAVE ARTICLE</button>
                </form>
            </div>
        </div>
    `;
}

function generateFavoritesStyles() {
    return `
        <style>
            .favorites-container {
                background: rgba(0, 20, 40, 0.9);
                border: 1px solid var(--primary-blue);
                padding: 15px;
                position: relative;
            }

            .tv-frame {
                border-radius: 5px;
                box-shadow: 
                    inset 0 0 20px rgba(0, 0, 0, 0.5),
                    0 0 10px rgba(0, 83, 155, 0.3);
                position: relative;
                overflow: hidden;
            }

            .favorites-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .header-controls {
                display: flex;
                gap: 10px;
                flex: 1;
            }

            .search-input {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid var(--primary-blue);
                color: var(--light-text);
                padding: 5px 10px;
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                width: 200px;
            }

            .sort-select {
                background: var(--primary-blue);
                color: white;
                border: 1px solid var(--primary-orange);
                padding: 5px 10px;
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                cursor: pointer;
            }

            .header-actions {
                display: flex;
                gap: 10px;
            }

            .action-button {
                background: rgba(0, 30, 60, 0.6);
                color: var(--light-text);
                border: 1px solid var(--primary-blue);
                padding: 5px 10px;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                font-size: 0.7rem;
                transition: all 0.3s;
            }

            .action-button.primary {
                background: var(--primary-blue);
                color: white;
            }

            .action-button:hover {
                background: var(--primary-orange);
                color: white;
            }

            .favorites-content {
                position: relative;
            }

            .favorites-list {
                max-height: 500px;
                overflow-y: auto;
                padding-right: 5px;
                margin-bottom: 15px;
            }

            .favorite-article {
                background: rgba(0, 30, 60, 0.6);
                padding: 15px;
                margin-bottom: 10px;
                border-left: 3px solid var(--primary-orange);
                transition: all 0.3s;
            }

            .favorite-article:hover {
                transform: translateX(5px);
                background: rgba(0, 40, 80, 0.6);
            }

            .article-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }

            .article-meta {
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .article-source {
                color: var(--primary-orange);
                font-size: 0.8rem;
                font-weight: bold;
            }

            .article-category {
                background: rgba(0, 83, 155, 0.3);
                color: var(--light-text);
                padding: 2px 5px;
                font-size: 0.7rem;
                border-radius: 3px;
            }

            .article-date {
                color: #aaa;
                font-size: 0.7rem;
            }

            .article-title {
                color: var(--light-text);
                font-size: 0.9rem;
                margin-bottom: 8px;
            }

            .article-excerpt {
                color: #bbb;
                font-size: 0.8rem;
                line-height: 1.4;
                margin-bottom: 10px;
            }

            .article-tags {
                display: flex;
                gap: 5px;
                flex-wrap: wrap;
                margin-bottom: 10px;
            }

            .tag {
                background: rgba(244, 125, 48, 0.2);
                color: var(--primary-orange);
                padding: 2px 5px;
                font-size: 0.7rem;
                border-radius: 3px;
            }

            .article-actions {
                display: flex;
                gap: 10px;
            }

            .article-actions button,
            .article-actions a {
                padding: 3px 8px;
                font-size: 0.7rem;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                text-transform: uppercase;
                border: none;
                transition: all 0.3s;
            }

            .article-edit {
                background: var(--primary-blue);
                color: white;
            }

            .article-remove {
                background: rgba(200, 0, 0, 0.3);
                color: #ff9999;
            }

            .article-read {
                background: var(--primary-orange);
                color: white;
                text-decoration: none;
            }

            .status-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 10px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }

            .article-count {
                color: #aaa;
                font-size: 0.8rem;
            }

            .danger-button {
                background: rgba(200, 0, 0, 0.3);
                color: #ff9999;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                font-size: 0.7rem;
                transition: all 0.3s;
            }

            .danger-button:hover {
                background: rgba(200, 0, 0, 0.5);
            }

            .empty-state {
                text-align: center;
                padding: 30px;
                color: #aaa;
            }

            .empty-state .subtitle {
                font-size: 0.8rem;
                margin-top: 10px;
                color: var(--primary-orange);
            }

            /* Modal Styles */
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 1000;
            }

            .modal-content {
                background: rgba(0, 20, 40, 0.95);
                margin: 5% auto;
                padding: 20px;
                width: 90%;
                max-width: 600px;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--primary-orange);
            }

            .modal-header h3 {
                color: var(--primary-orange);
                font-size: 1rem;
                text-transform: uppercase;
            }

            .close-modal {
                background: none;
                border: none;
                color: var(--primary-orange);
                font-size: 1.5rem;
                cursor: pointer;
            }

            .form-group {
                margin-bottom: 15px;
            }

            .form-group label {
                display: block;
                color: var(--light-text);
                margin-bottom: 5px;
                font-size: 0.8rem;
            }

            .form-group input,
            .form-group textarea,
            .form-group select {
                width: 100%;
                padding: 8px;
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid var(--primary-blue);
                color: var(--light-text);
                font-family: 'Courier New', monospace;
            }

            .submit-button {
                width: 100%;
                padding: 10px;
                background: var(--primary-blue);
                color: white;
                border: none;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                text-transform: uppercase;
                transition: all 0.3s;
            }

            .submit-button:hover {
                background: var(--primary-orange);
            }
        </style>
    `;
}

function initializeEventListeners(favorites) {
    // Search functionality
    const searchInput = document.getElementById('searchFavorites');
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase();
        filterFavorites(favorites, searchTerm);
    }, 300));

    // Sort functionality
    const sortSelect = document.getElementById('sortFavorites');
    sortSelect.addEventListener('change', function() {
        sortFavorites(favorites, this.value);
    });

    // Add new article
    document.getElementById('addFavorite').addEventListener('click', () => {
        showModal();
    });

    // Form submission
    document.getElementById('favoriteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveFavorite(favorites, this);
    });

    // Clear all
    document.getElementById('clearFavorites').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all saved articles?')) {
            clearFavorites();
        }
    });

    // Export/Import
    document.getElementById('exportFavorites').addEventListener('click', () => {
        exportFavorites(favorites);
    });

    document.getElementById('importFavorites').addEventListener('click', () => {
        importFavorites();
    });

    // Close modal
    document.querySelector('.close-modal').addEventListener('click', hideModal);
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModal();
        }
    });

    // Edit and Remove buttons
    document.querySelectorAll('.article-edit').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            editFavorite(favorites[index]);
        });
    });

    document.querySelectorAll('.article-remove').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removeFavorite(favorites, index);
        });
    });
}

// Utility Functions
function loadFavorites() {
    return JSON.parse(localStorage.getItem('savedArticles')) || [];
}

function saveFavorite(favorites, form) {
    const articleId = form.querySelector('#articleId').value;
    const newArticle = {
        title: form.querySelector('#articleTitle').value,
        source: form.querySelector('#articleSource').value,
        url: form.querySelector('#articleUrl').value,
        excerpt: form.querySelector('#articleExcerpt').value,
        category: form.querySelector('#articleCategory').value,
        tags: form.querySelector('#articleTags').value.split(',').map(tag => tag.trim()).filter(Boolean),
        timestamp: articleId ? favorites[articleId].timestamp : new Date().toISOString()
    };

    if (articleId) {
        favorites[articleId] = newArticle;
    } else {
        favorites.unshift(newArticle);
    }

    localStorage.setItem('savedArticles', JSON.stringify(favorites));
    hideModal();
    setupFavoritesWidget(document.getElementById('favoritesFeed'));
}

function removeFavorite(favorites, index) {
    favorites.splice(index, 1);
    localStorage.setItem('savedArticles', JSON.stringify(favorites));
    setupFavoritesWidget(document.getElementById('favoritesFeed'));
}

function editFavorite(article) {
    const form = document.getElementById('favoriteForm');
    form.querySelector('#articleTitle').value = article.title;
    form.querySelector('#articleSource').value = article.source;
    form.querySelector('#articleUrl').value = article.url;
    form.querySelector('#articleExcerpt').value = article.excerpt;
    form.querySelector('#articleCategory').value = article.category || '';
    form.querySelector('#articleTags').value = (article.tags || []).join(', ');
    form.querySelector('#articleId').value = favorites.indexOf(article);
    
    document.getElementById('modalTitle').textContent = 'EDIT ARTICLE';
    showModal();
}

function clearFavorites() {
    localStorage.removeItem('savedArticles');
    setupFavoritesWidget(document.getElementById('favoritesFeed'));
}

function exportFavorites(favorites) {
    const dataStr = JSON.stringify(favorites, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportName = 'favorites_' + new Date().toISOString().slice(0, 10) + '.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
}

function importFavorites() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const favorites = JSON.parse(e.target.result);
                localStorage.setItem('savedArticles', JSON.stringify(favorites));
                setupFavoritesWidget(document.getElementById('favoritesFeed'));
            } catch (error) {
                alert('Invalid file format');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function filterFavorites(favorites, searchTerm) {
    const filteredFavorites = favorites.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.source.toLowerCase().includes(searchTerm) ||
        (article.tags || []).some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    document.getElementById('favoritesList').innerHTML = renderFavoritesList(filteredFavorites);
}

function sortFavorites(favorites, sortType) {
    switch (sortType) {
        case 'newest':
            favorites.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            break;
        case 'oldest':
            favorites.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            break;
        case 'alphabetical':
            favorites.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    document.getElementById('favoritesList').innerHTML = renderFavoritesList(favorites);
}

function showModal() {
    document.getElementById('favoriteModal').style.display = 'block';
}

function hideModal() {
    const modal = document.getElementById('favoriteModal');
    modal.style.display = 'none';
    document.getElementById('favoriteForm').reset();
    document.getElementById('articleId').value = '';
    document.getElementById('modalTitle').textContent = 'ADD NEW ARTICLE';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}