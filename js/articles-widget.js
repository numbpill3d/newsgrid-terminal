// Articles Widget Configuration
const ARTICLES_CONFIG = {
    galleryInterval: 10000, // 10 seconds
    maxGalleryItems: 5,
    transitionDuration: 500
};

// Initialize Articles Widget
document.addEventListener('DOMContentLoaded', function() {
    initArticlesWidget();
});

function initArticlesWidget() {
    const container = document.getElementById('articleScreenshots');
    setupArticlesWidget(container);
    setupBookDefinitions();
}

function setupArticlesWidget(container) {
    // Sample articles data (in a real implementation, this would come from a database)
    const articles = [
        {
            title: "Breaking: Major Policy Changes Announced",
            screenshot: "https://picsum.photos/400/300?random=1",
            date: "2025-03-06",
            description: "Comprehensive analysis of the latest policy changes and their implications..."
        },
        {
            title: "Economic Impact Report: Q1 2025",
            screenshot: "https://picsum.photos/400/300?random=2",
            date: "2025-03-05",
            description: "Detailed breakdown of economic indicators and future projections..."
        },
        {
            title: "Technology Sector Analysis",
            screenshot: "https://picsum.photos/400/300?random=3",
            date: "2025-03-04",
            description: "In-depth look at emerging technologies and market trends..."
        }
    ];

    // Sample book definitions
    const books = [
        {
            title: "Understanding Modern Politics",
            cover: "https://picsum.photos/200/300?random=4",
            author: "Dr. Jane Smith",
            definition: "A comprehensive examination of political systems and their evolution in the modern era..."
        },
        {
            title: "Democracy in the Digital Age",
            cover: "https://picsum.photos/200/300?random=5",
            author: "Prof. John Doe",
            definition: "An analysis of how technology impacts democratic institutions and processes..."
        }
    ];

    let html = `
        <div class="articles-container">
            <div class="gallery-section">
                <h3 class="section-title">FEATURED ARTICLES</h3>
                <div class="gallery" id="articlesGallery">
                    <div class="gallery-track">
                        ${articles.map((article, index) => `
                            <div class="gallery-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <div class="article-card">
                                    <div class="article-image">
                                        <img src="${article.screenshot}" alt="${article.title}">
                                    </div>
                                    <div class="article-info">
                                        <h4>${article.title}</h4>
                                        <span class="article-date">${formatDate(article.date)}</span>
                                        <p class="article-description">${article.description}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="gallery-nav">
                        <button class="nav-button prev" aria-label="Previous article">◄</button>
                        <div class="gallery-dots">
                            ${articles.map((_, index) => `
                                <button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                            `).join('')}
                        </div>
                        <button class="nav-button next" aria-label="Next article">►</button>
                    </div>
                </div>
            </div>

            <div class="books-section">
                <h3 class="section-title">POLITICAL THEORY</h3>
                <div class="books-grid">
                    ${books.map(book => `
                        <div class="book-card" tabindex="0">
                            <div class="book-cover">
                                <img src="${book.cover}" alt="${book.title}">
                            </div>
                            <div class="book-overlay">
                                <h4>${book.title}</h4>
                                <p class="book-author">by ${book.author}</p>
                            </div>
                            <div class="book-definition">
                                <div class="definition-content">
                                    <h4>${book.title}</h4>
                                    <p class="definition-text">${book.definition}</p>
                                    <button class="close-definition">CLOSE</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        ${generateArticlesStyles()}
    `;

    container.innerHTML = html;
    initializeGallery();
    initializeBookInteractions();
}

function generateArticlesStyles() {
    return `
        <style>
            .articles-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .section-title {
                color: var(--primary-orange);
                font-size: 1rem;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
                text-shadow: 0 0 5px rgba(244, 125, 48, 0.5);
            }

            /* Gallery Styles */
            .gallery {
                position: relative;
                overflow: hidden;
                background: rgba(0, 20, 40, 0.8);
                border: 1px solid var(--primary-blue);
                border-radius: 5px;
                padding: 15px;
            }

            .gallery-track {
                display: flex;
                transition: transform ${ARTICLES_CONFIG.transitionDuration}ms ease;
            }

            .gallery-item {
                min-width: 100%;
                opacity: 0;
                transition: opacity ${ARTICLES_CONFIG.transitionDuration}ms ease;
            }

            .gallery-item.active {
                opacity: 1;
            }

            .article-card {
                display: flex;
                gap: 15px;
            }

            .article-image {
                flex: 0 0 200px;
                height: 150px;
                overflow: hidden;
            }

            .article-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .article-info {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .article-info h4 {
                color: var(--light-text);
                margin-bottom: 5px;
                font-size: 0.9rem;
            }

            .article-date {
                color: var(--primary-orange);
                font-size: 0.7rem;
                margin-bottom: 10px;
            }

            .article-description {
                color: #aaa;
                font-size: 0.8rem;
                line-height: 1.4;
            }

            .gallery-nav {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
                margin-top: 15px;
            }

            .nav-button {
                background: none;
                border: none;
                color: var(--primary-orange);
                font-size: 1rem;
                cursor: pointer;
                padding: 5px;
                transition: color 0.3s;
            }

            .nav-button:hover {
                color: var(--primary-blue);
            }

            .gallery-dots {
                display: flex;
                gap: 5px;
            }

            .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                cursor: pointer;
                padding: 0;
            }

            .dot.active {
                background: var(--primary-orange);
            }

            /* Books Grid Styles */
            .books-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 15px;
            }

            .book-card {
                position: relative;
                aspect-ratio: 2/3;
                cursor: pointer;
                transform-style: preserve-3d;
                transition: transform 0.5s;
            }

            .book-cover {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
                border: 2px solid var(--primary-blue);
            }

            .book-cover img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .book-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.8);
                padding: 10px;
                transform: translateY(100%);
                transition: transform 0.3s;
            }

            .book-card:hover .book-overlay {
                transform: translateY(0);
            }

            .book-overlay h4 {
                color: var(--light-text);
                font-size: 0.8rem;
                margin-bottom: 5px;
            }

            .book-author {
                color: var(--primary-orange);
                font-size: 0.7rem;
            }

            .book-definition {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 20, 40, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s;
            }

            .book-card.show-definition .book-definition {
                opacity: 1;
                visibility: visible;
            }

            .definition-content {
                padding: 15px;
                color: var(--light-text);
            }

            .definition-content h4 {
                color: var(--primary-orange);
                margin-bottom: 10px;
                font-size: 0.9rem;
            }

            .definition-text {
                font-size: 0.8rem;
                line-height: 1.4;
                margin-bottom: 15px;
            }

            .close-definition {
                background: var(--primary-blue);
                color: white;
                border: none;
                padding: 5px 10px;
                font-size: 0.7rem;
                cursor: pointer;
                width: 100%;
            }

            .close-definition:hover {
                background: var(--primary-orange);
            }
        </style>
    `;
}

function initializeGallery() {
    const gallery = document.getElementById('articlesGallery');
    const track = gallery.querySelector('.gallery-track');
    const items = gallery.querySelectorAll('.gallery-item');
    const dots = gallery.querySelectorAll('.dot');
    let currentIndex = 0;
    let interval;

    function showItem(index) {
        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        items[index].classList.add('active');
        dots[index].classList.add('active');
        
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function previousItem() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    // Setup navigation
    gallery.querySelector('.next').addEventListener('click', () => {
        nextItem();
        resetInterval();
    });

    gallery.querySelector('.prev').addEventListener('click', () => {
        previousItem();
        resetInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showItem(currentIndex);
            resetInterval();
        });
    });

    // Setup auto-scroll
    function startInterval() {
        interval = setInterval(nextItem, ARTICLES_CONFIG.galleryInterval);
    }

    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    startInterval();

    // Pause on hover
    gallery.addEventListener('mouseenter', () => clearInterval(interval));
    gallery.addEventListener('mouseleave', startInterval);

    // Keyboard navigation
    gallery.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextItem();
        if (e.key === 'ArrowLeft') previousItem();
    });
}

function initializeBookInteractions() {
    const books = document.querySelectorAll('.book-card');

    books.forEach(book => {
        book.addEventListener('click', function() {
            this.classList.toggle('show-definition');
        });

        book.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.classList.toggle('show-definition');
            }
        });

        const closeBtn = book.querySelector('.close-definition');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                book.classList.remove('show-definition');
            });
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}