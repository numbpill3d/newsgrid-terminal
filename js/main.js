// Main Integration Script - Load all components and handle global functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('NewsGrid Terminal initializing...');
    
    // Add global event listeners
    setupGlobalListeners();
    
    // Initialize CRT effects
    setupCRTEffects();
    
    // Start the system bootup sequence
    initializeSystem();
});

// Global event listeners
function setupGlobalListeners() {
    // Listen for keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+S to toggle start menu
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            document.getElementById('startButton').click();
        }
        
        // Esc to close any open modals
        if (e.key === 'Escape') {
            // Find and close any open modals
            const modals = document.querySelectorAll('.modal, .screenshot-modal');
            modals.forEach(modal => {
                if (modal.style.display !== 'none') {
                    if (modal.classList.contains('screenshot-modal')) {
                        document.body.removeChild(modal);
                    } else {
                        modal.style.display = 'none';
                    }
                }
            });
            
            // Close sidebar if open
            document.getElementById('sidebar').classList.remove('active');
        }
    });

    // Start Button & Sidebar Functionality
    document.getElementById('startButton').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const startButton = document.getElementById('startButton');
        
        if (!sidebar.contains(event.target) && event.target !== startButton) {
            sidebar.classList.remove('active');
        }
    });
}

// CRT effects and animations
function setupCRTEffects() {
    // Random screen glitch effect
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance of glitch
            const glitchDuration = Math.random() * 200 + 50; // 50-250ms
            
            document.body.classList.add('crt-glitch');
            
            setTimeout(() => {
                document.body.classList.remove('crt-glitch');
            }, glitchDuration);
        }
    }, 5000);
}

// System bootup sequence animation
function initializeSystem() {
    const bootScreen = document.createElement('div');
    bootScreen.className = 'boot-screen';
    
    bootScreen.innerHTML = `
        <div class="boot-content">
            <h1>NEWSGRID TERMINAL</h1>
            <h2>INITIALIZATION SEQUENCE</h2>
            <div class="boot-progress">
                <div class="progress-bar"></div>
            </div>
            <div id="bootMessages" class="boot-messages">
                <p>System boot initiated...</p>
            </div>
        </div>
        
        <style>
            .boot-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: black;
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
                color: var(--primary-blue);
                font-family: 'Courier New', monospace;
            }
            
            .boot-content {
                width: 90%;
                max-width: 600px;
            }
            
            .boot-screen h1 {
                font-size: 2rem;
                color: var(--primary-orange);
                text-align: center;
                margin-bottom: 10px;
                text-shadow: 0 0 10px rgba(244, 125, 48, 0.7);
            }
            
            .boot-screen h2 {
                font-size: 1rem;
                text-align: center;
                margin-bottom: 30px;
                color: var(--light-text);
            }
            
            .boot-progress {
                height: 20px;
                background-color: rgba(0, 30, 60, 0.6);
                border: 1px solid var(--primary-blue);
                margin-bottom: 20px;
                position: relative;
                overflow: hidden;
            }
            
            .progress-bar {
                height: 100%;
                background-color: var(--primary-blue);
                width: 0%;
                transition: width 0.5s;
            }
            
            .boot-messages {
                background-color: rgba(0, 30, 60, 0.3);
                border: 1px solid var(--primary-blue);
                padding: 15px;
                height: 200px;
                overflow-y: auto;
                font-size: 0.9rem;
                color: var(--light-text);
            }
            
            .boot-messages p {
                margin: 0;
                padding: 3px 0;
            }
            
            .boot-messages .error {
                color: red;
            }
            
            .boot-messages .success {
                color: lightgreen;
            }
            
            .boot-messages .warning {
                color: var(--primary-orange);
            }
        </style>
    `;
    
    document.body.appendChild(bootScreen);
    
    // Boot sequence messages
    const bootMessages = [
        {text: "Initializing core systems...", delay: 500},
        {text: "Loading UI components...", delay: 1000},
        {text: "Establishing network connections...", delay: 800},
        {text: "WARNING: RSS feed connection unstable", type: "warning", delay: 600},
        {text: "Rerouting through backup servers...", delay: 700},
        {text: "Connection established", type: "success", delay: 500},
        {text: "Loading external APIs...", delay: 800},
        {text: "Loading Reddit API...", delay: 400},
        {text: "Loading YouTube API...", delay: 400},
        {text: "Loading Instagram Feed...", delay: 400},
        {text: "Loading Threads Feed...", delay: 400},
        {text: "Calibrating CRT display parameters...", delay: 600},
        {text: "Adjusting scanline density...", delay: 500},
        {text: "Optimizing refresh rate...", delay: 700},
        {text: "Initializing memory banks...", delay: 600},
        {text: "System verification: 100% complete", type: "success", delay: 800},
        {text: "NEWSGRID TERMINAL READY", type: "success", delay: 500}
    ];
    
    const bootMessagesElement = document.getElementById('bootMessages');
    const progressBar = document.querySelector('.progress-bar');
    
    // Display boot messages with typing effect
    let i = 0;
    let progressValue = 0;
    const progressIncrement = 100 / bootMessages.length;
    
    function displayNextMessage() {
        if (i < bootMessages.length) {
            const message = bootMessages[i];
            const messageElement = document.createElement('p');
            
            if (message.type) {
                messageElement.className = message.type;
            }
            
            messageElement.textContent = message.text;
            bootMessagesElement.appendChild(messageElement);
            bootMessagesElement.scrollTop = bootMessagesElement.scrollHeight;
            
            // Update progress bar
            progressValue += progressIncrement;
            progressBar.style.width = `${progressValue}%`;
            
            i++;
            
            // Schedule next message
            setTimeout(displayNextMessage, message.delay);
        } else {
            // Boot sequence complete, remove boot screen with fade effect
            bootScreen.style.transition = 'opacity 1s';
            bootScreen.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(bootScreen);
            }, 1000);
        }
    }
    
    // Start displaying messages after a short delay
    setTimeout(displayNextMessage, 1000);
}

// Utility function to format numbers (e.g., 1.2k instead of 1200)
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}
