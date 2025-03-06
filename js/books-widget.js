// Interactive Books Widget with Hidden Definitions
document.addEventListener('DOMContentLoaded', function() {
    setupInteractiveBooksWidget();
});

function setupInteractiveBooksWidget() {
    const interactiveBooksElement = document.getElementById('interactiveBooks');
    
    // Sample books data with hidden definitions
    const books = [
        {
            title: "Neuromancer",
            author: "William Gibson",
            coverUrl: "https://via.placeholder.com/150x200",
            year: "1984",
            definition: "A groundbreaking cyberpunk novel that coined the term 'cyberspace' and predicted the internet. The story follows Case, a washed-up computer hacker hired for one last job that involves an artificial intelligence seeking to free itself."
        },
        {
            title: "Snow Crash",
            author: "Neal Stephenson",
            coverUrl: "https://via.placeholder.com/150x200",
            year: "1992",
            definition: "This novel combines the Sumerian language, linguistics, virtual reality, and ancient mythology to explore a future where corporations have replaced nations and a virus called Snow Crash threatens to take down hackers in both the virtual and real worlds."
        },
        {
            title: "Do Androids Dream of Electric Sheep?",
            author: "Philip K. Dick",
            coverUrl: "https://via.placeholder.com/150x200",
            year: "1968",
            definition: "The novel that inspired Blade Runner, this book explores the distinction between humans and androids in a post-apocalyptic world, questioning what it means to be human through the journey of bounty hunter Rick Deckard."
        },
        {
            title: "Burning Chrome",
            author: "William Gibson",
            coverUrl: "https://via.placeholder.com/150x200",
            year: "1986",
            definition: "A collection of short stories set in the same universe as Neuromancer. The title story introduced the concept of 'cyberspace,' while another story, 'Johnny Mnemonic,' was later adapted into a film."
        }
    ];
    
    // Create HTML for the interactive books widget
    let booksHTML = `
        <div class="books-container">
            <div class="books-header">
                <h3>Cyberpunk Literature Database</h3>
                <div class="books-counter">DATABASE: ${books.length} ENTRIES</div>
            </div>
            <div class="books-grid">`;
    
    books.forEach((book, index) => {
        booksHTML += `
            <div class="book-item" data-index="${index}">
                <div class="book-cover">
                    <img src="${book.coverUrl}" alt="${book.title} cover">
                </div>
                <div class="book-info">
                    <h4 class="book-title">${book.title}</h4>
                    <div class="book-meta">
                        <span class="book-author">${book.author}</span>
                        <span class="book-year">${book.year}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    booksHTML += `
            </div>
            <div id="bookDefinition" class="book-definition">
                <div class="definition-header">
                    <h4>SELECT A BOOK TO DISPLAY DEFINITION</h4>
                    <div class="definition-terminal-line"></div>
                </div>
                <div class="definition-content">
                    <p>Click on any book cover to reveal hidden information...</p>
                </div>
            </div>
        </div>
        
        <style>
            .books-container {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .books-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 5px;
            }
            
            .books-header h3 {
                font-size: 0.9rem;
                color: var(--light-text);
                text-transform: uppercase;
                margin: 0;
            }
            
            .books-counter {
                font-size: 0.7rem;
                color: var(--primary-orange);
                font-family: 'Courier New', monospace;
            }
            
            .books-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 10px;
            }
            
            .book-item {
                background-color: rgba(0, 30, 60, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 5px;
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .book-item::before {
                content: 'CLICK';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(244, 125, 48, 0.8);
                color: #000;
                padding: 2px 5px;
                font-size: 0.6rem;
                font-weight: bold;
                opacity: 0;
                transition: opacity 0.3s;
                z-index: 10;
            }
            
            .book-item:hover::before {
                opacity: 1;
            }
            
            .book-item:hover {
                transform: scale(1.03);
                box-shadow: 0 0 10px rgba(0, 83, 155, 0.7);
                border: 1px solid var(--primary-orange);
            }
            
            .book-item.active {
                border: 1px solid var(--primary-orange);
                box-shadow: 0 0 15px rgba(244, 125, 48, 0.5);
            }
            
            .book-cover {
                position: relative;
                width: 100%;
                height: 150px;
                overflow: hidden;
                margin-bottom: 5px;
            }
            
            .book-cover img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: filter 0.3s;
            }
            
            .book-item:hover .book-cover img {
                filter: brightness(1.2);
            }
            
            .book-info {
                padding: 5px 0;
            }
            
            .book-title {
                font-size: 0.8rem;
                margin: 0 0 5px 0;
                color: var(--light-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .book-meta {
                display: flex;
                justify-content: space-between;
                font-size: 0.6rem;
                color: #aaa;
            }
            
            .book-definition {
                background-color: rgba(0, 20, 40, 0.8);
                border: 1px solid var(--primary-blue);
                padding: 15px;
                margin-top: 15px;
                min-height: 150px;
                position: relative;
            }
            
            .definition-header {
                margin-bottom: 10px;
            }
            
            .definition-header h4 {
                font-size: 0.8rem;
                color: var(--primary-orange);
                margin: 0;
                text-transform: uppercase;
            }
            
            .definition-terminal-line {
                height: 2px;
                background: linear-gradient(to right, var(--primary-orange), transparent);
                margin-top: 5px;
            }
            
            .definition-content {
                font-size: 0.8rem;
                color: var(--light-text);
                line-height: 1.4;
            }
            
            .definition-content p {
                margin: 0;
            }
            
            /* Terminal cursor blinking effect */
            .cursor-effect {
                border-right: 0.15em solid var(--primary-orange);
                animation: blinking-cursor 1s step-end infinite;
            }
            
            @keyframes blinking-cursor {
                from, to { border-color: transparent; }
                50% { border-color: var(--primary-orange); }
            }
        </style>
    `;
    
    interactiveBooksElement.innerHTML = booksHTML;
    
    // Add event listeners for book clicks
    document.querySelectorAll('.book-item').forEach((bookItem, index) => {
        bookItem.addEventListener('click', function() {
            // Remove active class from all books
            document.querySelectorAll('.book-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked book
            this.classList.add('active');
            
            // Get book data
            const book = books[index];
            
            // Update definition area
            const definitionHeader = document.querySelector('.definition-header h4');
            const definitionContent = document.querySelector('.definition-content');
            
            definitionHeader.textContent = `${book.title} (${book.year})`;
            
            // Simulate typing effect for the definition
            definitionContent.innerHTML = `<p class="cursor-effect"></p>`;
            const textElement = definitionContent.querySelector('p');
            
            let i = 0;
            const definitionText = book.definition;
            const typeSpeed = 20; // milliseconds
            
            function typeWriter() {
                if (i < definitionText.length) {
                    textElement.textContent += definitionText.charAt(i);
                    i++;
                    setTimeout(typeWriter, typeSpeed);
                } else {
                    // Remove cursor effect when typing is complete
                    textElement.classList.remove('cursor-effect');
                }
            }
            
            // Start typing effect
            textElement.textContent = '';
            i = 0;
            setTimeout(typeWriter, 200);
        });
    });
}
