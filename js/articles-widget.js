// Article Screenshots Widget Script
document.addEventListener('DOMContentLoaded', function() {
    setupArticleScreenshotsWidget();
});

function setupArticleScreenshotsWidget() {
    const articleScreenshots = document.getElementById('articleScreenshots');
    
    // Mock article screenshots
    const screenshots = [
        {
            title: "Economic Report: Q1 2025",
            imageUrl: "https://via.placeholder.com/300x200",
            date: "Mar 01, 2025"
        },
        {
            title: "Technology Review: New AI const screenshots = [
        {
            title: "Economic Report: Q1 2025",
            imageUrl: "https://via.placeholder.com/300x200",
            date: "Mar 01, 2025"
        },
        {
            title: "Technology Review: New AI Systems",
            imageUrl: "https://via.placeholder.com/300x200",
            date: "Feb 27, 2025"
        }
    ];
    
    // Create HTML for article screenshots
    let screenshotsHTML = `
        <div class="screenshots-container">
            <div class="screenshots-header">
                <span>Total Articles: ${screenshots.length}</span>
                <button id="uploadScreenshot" class="upload-button">UPLOAD NEW</button>
            </div>
            <div class="screenshots-grid">`;
    
    screenshots.forEach(screenshot => {
        screenshotsHTML += `
            <div class="screenshot-item">
                <div class="screenshot-image">
                    <img src="${screenshot.imageUrl}" alt="${screenshot.title}">
                </div>
                <div class="screenshot-info">
                    <h4 class="screenshot-title">${screenshot.title}</h4>
                    <span class="screenshot-date">${screenshot.date}</span>
                </div>
            </div>
        `;
    });
    
    screenshotsHTML += `
            </div>
            
            <!-- Upload Form (hidden, would be shown with JavaScript) -->
            <div id="uploadForm" class="upload-form" style="display: none;">
                <h4>Upload New Article</h4>
                <div class="form-group">
                    <label for="screenshotTitle">Title:</label>
                    <input type="text" id="screenshotTitle" required>
                </div>
                <div class="form-group">
                    <label for="screenshotFile">File:</label>
                    <input type="file" id="screenshotFile" accept="image/*" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-button">CANCEL</button>
                    <button type="button" class="save-button">UPLOAD</button>
                </div>
            </div>
        </div>
        
        <style>
            .screenshots-container {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .screenshots-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                font-size: 0.8rem;
                color: #aaa;
            }
            
            .upload-button {
                background-color: var(--primary-blue);
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
                font-size: 0.7rem;
                text-transform: uppercase;
                font-family: 'Courier New', monospace;
            }
            
            .upload-button:hover {
                background-color: var(--primary-orange);
            }
            
            .screenshots-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                gap: 10px;
            }
            
            .screenshot-item {
                background-color: rgba(0, 30, 60, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
                overflow: hidden;
                transition: transform 0.2s;
                cursor: pointer;
            }
            
            .screenshot-item:hover {
                transform: scale(1.03);
                box-shadow: 0 0 10px rgba(0, 83, 155, 0.5);
            }
            
            .screenshot-image {
                width: 100%;
                height: 80px;
                overflow: hidden;
            }
            
            .screenshot-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .screenshot-info {
                padding: 8px;
            }
            
            .screenshot-title {
                font-size: 0.7rem;
                margin-bottom: 5px;
                color: var(--light-text);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .screenshot-date {
                font-size: 0.6rem;
                color: #aaa;
            }
            
            /* Upload Form Styles */
            .upload-form {
                background-color: rgba(0, 20, 40, 0.9);
                border: 1px solid var(--primary-orange);
                padding: 15px;
                margin-top: 15px;
            }
            
            .upload-form h4 {
                margin-bottom: 10px;
                color: var(--light-text);
                font-size: 0.9rem;
                text-transform: uppercase;
            }
            
            .form-group {
                margin-bottom: 10px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-size: 0.8rem;
                color: #aaa;
            }
            
            .form-group input {
                width: 100%;
                padding: 8px;
                background-color: rgba(0, 0, 0, 0.3);
                border: 1px solid #444;
                color: var(--light-text);
                font-family: 'Courier New', monospace;
            }
            
            .form-actions {
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
            }
            
            .cancel-button, .save-button {
                padding: 5px 10px;
                border: none;
                font-size: 0.7rem;
                text-transform: uppercase;
                cursor: pointer;
                font-family: 'Courier New', monospace;
            }
            
            .cancel-button {
                background-color: rgba(0, 0, 0, 0.3);
                color: #aaa;
            }
            
            .save-button {
                background-color: var(--primary-blue);
                color: white;
            }
            
            .save-button:hover {
                background-color: var(--primary-orange);
            }
            
            .cancel-button:hover {
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
            }
        </style>
    `;
    
    articleScreenshots.innerHTML = screenshotsHTML;
    
    // Add event listeners for Upload functionality
    document.getElementById('uploadScreenshot').addEventListener('click', function() {
        const uploadForm = document.getElementById('uploadForm');
        uploadForm.style.display = uploadForm.style.display === 'none' ? 'block' : 'none';
    });
    
    document.querySelector('.cancel-button').addEventListener('click', function() {
        document.getElementById('uploadForm').style.display = 'none';
    });
    
    document.querySelector('.save-button').addEventListener('click', function() {
        const title = document.getElementById('screenshotTitle').value;
        if (!title) {
            alert('Please enter a title for your screenshot.');
            return;
        }
        
        const fileInput = document.getElementById('screenshotFile');
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Please select a file to upload.');
            return;
        }
        
        // In a real implementation, you would upload the file to a server
        // For this example, we'll just simulate success
        
        alert('Screenshot uploaded successfully!');
        document.getElementById('uploadForm').style.display = 'none';
        
        // In reality, you would refresh the screenshots grid here
    });
    
    // Add click event for screenshots to view them in a larger modal
    document.querySelectorAll('.screenshot-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.screenshot-title').textContent;
            const imageUrl = this.querySelector('img').src;
            
            // Create a simple modal to view the screenshot
            const modal = document.createElement('div');
            modal.className = 'screenshot-modal';
            
            modal.innerHTML = `
                <div class="screenshot-modal-content">
                    <span class="screenshot-modal-close">&times;</span>
                    <h3>${title}</h3>
                    <img src="${imageUrl}" alt="${title}">
                </div>
                <style>
                    .screenshot-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.8);
                        z-index: 1000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .screenshot-modal-content {
                        background-color: rgba(0, 30, 60, 0.95);
                        padding: 20px;
                        border: 2px solid var(--primary-orange);
                        max-width: 80%;
                        max-height: 80%;
                        overflow: auto;
                        position: relative;
                    }
                    
                    .screenshot-modal-close {
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        color: var(--primary-orange);
                        font-size: 24px;
                        cursor: pointer;
                    }
                    
                    .screenshot-modal-content h3 {
                        margin-bottom: 15px;
                        color: var(--light-text);
                    }
                    
                    .screenshot-modal-content img {
                        max-width: 100%;
                        height: auto;
                    }
                </style>
            `;
            
            document.body.appendChild(modal);
            
            // Add close functionality
            modal.querySelector('.screenshot-modal-close').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Also close when clicking outside the content
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
}
