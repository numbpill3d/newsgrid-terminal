// YouTube Player Configuration
const YOUTUBE_CONFIG = {
    channels: [
        { id: 'UCeY0bbntWzzVIaj2z3QigXg', name: 'NBC News', videoId: 'live' },
        { id: 'UCBi2mrWuNuyYy4gbM6fU18Q', name: 'ABC News', videoId: 'live' },
        { id: 'UCupvZG-5ko_eiXAupbDfxWw', name: 'CNN News', videoId: 'live' },
        { id: 'UC8p1vwvWtl6T73JiExfWs1g', name: 'CBS News', videoId: 'live' }
    ],
    defaultChannel: 0,
    retryAttempts: 3,
    retryDelay: 5000
};

// Initialize YouTube Player
document.addEventListener('DOMContentLoaded', function() {
    initYouTubePlayer();
});

function initYouTubePlayer() {
    const container = document.getElementById('youtubePlayer');
    setupTVFrame(container);
    loadYouTubeAPI();
}

function setupTVFrame(container) {
    container.innerHTML = `
        <div class="retro-tv">
            <div class="tv-frame">
                <div class="tv-screen">
                    <div class="tv-content">
                        <div id="ytplayer"></div>
                        <div class="tv-overlay">
                            <div class="channel-info" id="channelInfo"></div>
                            <div class="news-banner" id="newsBanner">LIVE NEWS FEED</div>
                        </div>
                        <div class="tv-static" id="tvStatic"></div>
                        <div class="tv-scanlines"></div>
                    </div>
                </div>
                <div class="tv-controls">
                    <div class="tv-brand">OMNI CONSUMER PRODUCTS</div>
                    <div class="tv-knobs">
                        <div class="channel-display" id="channelDisplay">CH-1</div>
                        <div class="tv-channels" id="channelButtons"></div>
                    </div>
                </div>
                <div class="tv-status" id="tvStatus">
                    <div class="status-light"></div>
                    <span class="status-text">SIGNAL LOCKED</span>
                </div>
            </div>
        </div>
        ${generateTVStyles()}
    `;

    setupChannelButtons();
}

function generateTVStyles() {
    return `
        <style>
            .retro-tv {
                width: 100%;
                margin: 0 auto;
                position: relative;
            }
            
            .tv-frame {
                background: linear-gradient(45deg, #1a1a1a, #333);
                border-radius: 15px;
                padding: 20px;
                box-shadow: 
                    0 0 20px rgba(0, 0, 0, 0.5),
                    inset 0 0 10px rgba(0, 0, 0, 0.8);
                position: relative;
                overflow: hidden;
            }
            
            .tv-screen {
                background-color: #000;
                position: relative;
                width: 100%;
                padding-top: 56.25%;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 
                    inset 0 0 20px rgba(0, 0, 0, 0.9),
                    0 0 5px rgba(var(--primary-blue-rgb), 0.5);
            }
            
            .tv-content {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2;
            }
            
            #ytplayer {
                width: 100%;
                height: 100%;
            }
            
            .tv-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 3;
                pointer-events: none;
            }
            
            .channel-info {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.7);
                color: var(--primary-orange);
                padding: 5px 10px;
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                border: 1px solid var(--primary-orange);
            }
            
            .news-banner {
                position: absolute;
                bottom: 20px;
                left: 0;
                width: 100%;
                background: var(--primary-blue);
                color: white;
                text-align: center;
                padding: 5px;
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                opacity: 0.8;
            }
            
            .tv-static {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANxM8mAAAACHRSTlMzABEiM0Qid4dJv+8AAACWSURBVHjaZc4xCgJBDIXhN8u2UQsRQe1E8AqWW3gAsfQGHsAT2FjYegd7K/EIHsAjiAii5Wz2DYrDwBTzQTIPEp6ZzBJAGC2c/QigYZBWEkijpWUEbduGXTx89MP+iP3hD/1V5qZxOcTt1r2PY1yBqyNUZ3b0S7qXrYQHKjMnqWVKXLJKaK0E8+YlL68hZKV09vjHF8wvF4w0fx4CAAAAAElFTkSuQmCC');
                opacity: 0.05;
                pointer-events: none;
                z-index: 4;
                animation: staticNoise 0.2s steps(4) infinite;
            }
            
            .tv-scanlines {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    to bottom,
                    transparent 50%,
                    rgba(0, 0, 0, 0.1) 51%
                );
                background-size: 100% 4px;
                z-index: 5;
                pointer-events: none;
                opacity: 0.3;
            }
            
            .tv-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0;
                margin-top: 15px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .tv-brand {
                font-family: 'Courier New', monospace;
                font-weight: bold;
                font-size: 0.8rem;
                color: var(--primary-orange);
                text-transform: uppercase;
                text-shadow: 0 0 5px rgba(244, 125, 48, 0.5);
            }
            
            .tv-knobs {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .channel-display {
                background: #000;
                color: var(--primary-orange);
                padding: 5px 10px;
                font-family: 'Courier New', monospace;
                font-size: 0.8rem;
                border: 1px solid var(--primary-orange);
                text-shadow: 0 0 5px rgba(244, 125, 48, 0.5);
            }
            
            .tv-channels {
                display: flex;
                gap: 5px;
            }
            
            .channel-button {
                background: rgba(0, 30, 60, 0.8);
                color: var(--light-text);
                border: 1px solid var(--primary-blue);
                font-family: 'Courier New', monospace;
                font-size: 0.7rem;
                padding: 5px 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .channel-button:hover {
                background: var(--primary-orange);
                color: #000;
                border-color: var(--primary-orange);
            }
            
            .channel-button.active {
                background: var(--primary-blue);
                color: white;
                border-color: var(--primary-orange);
                box-shadow: 0 0 10px rgba(0, 83, 155, 0.5);
            }
            
            .tv-status {
                position: absolute;
                bottom: 10px;
                right: 20px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .status-light {
                width: 8px;
                height: 8px;
                background: var(--primary-orange);
                border-radius: 50%;
                animation: blink 2s infinite;
            }
            
            .status-text {
                color: var(--primary-orange);
                font-family: 'Courier New', monospace;
                font-size: 0.7rem;
            }
            
            @keyframes staticNoise {
                0% { transform: translate(0,0) }
                25% { transform: translate(-2%,-2%) }
                50% { transform: translate(2%,2%) }
                75% { transform: translate(-2%,2%) }
                100% { transform: translate(2%,-2%) }
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            .error-screen {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                color: var(--primary-orange);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-family: 'Courier New', monospace;
                z-index: 10;
            }
            
            .error-screen h3 {
                margin-bottom: 10px;
                text-transform: uppercase;
            }
            
            .error-screen p {
                font-size: 0.8rem;
                opacity: 0.8;
            }
        </style>
    `;
}

function loadYouTubeAPI() {
    if (window.YT) {
        initPlayer();
        return;
    }

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    window.onYouTubeIframeAPIReady = initPlayer;
}

function initPlayer() {
    const defaultChannel = YOUTUBE_CONFIG.channels[YOUTUBE_CONFIG.defaultChannel];
    createPlayer(defaultChannel.videoId);
}

function createPlayer(videoId) {
    window.player = new YT.Player('ytplayer', {
        videoId: videoId,
        playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            fs: 0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(50);
    event.target.playVideo();
    updateChannelInfo(YOUTUBE_CONFIG.channels[YOUTUBE_CONFIG.defaultChannel]);
}

function onPlayerStateChange(event) {
    const static = document.getElementById('tvStatic');
    
    switch(event.data) {
        case YT.PlayerState.BUFFERING:
            static.style.opacity = '0.3';
            break;
        case YT.PlayerState.PLAYING:
            static.style.opacity = '0.05';
            break;
        case YT.PlayerState.ENDED:
            static.style.opacity = '0.3';
            // Auto switch to next channel
            switchToNextChannel();
            break;
    }
}

function onPlayerError(event) {
    showErrorScreen();
}

function setupChannelButtons() {
    const buttonContainer = document.getElementById('channelButtons');
    
    YOUTUBE_CONFIG.channels.forEach((channel, index) => {
        const button = document.createElement('button');
        button.className = `channel-button ${index === 0 ? 'active' : ''}`;
        button.textContent = `CH${index + 1}`;
        button.addEventListener('click', () => switchChannel(index));
        buttonContainer.appendChild(button);
    });
}

function switchChannel(index) {
    const channel = YOUTUBE_CONFIG.channels[index];
    const static = document.getElementById('tvStatic');
    const buttons = document.querySelectorAll('.channel-button');
    const channelDisplay = document.getElementById('channelDisplay');
    
    // Update UI
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[index].classList.add('active');
    channelDisplay.textContent = `CH-${index + 1}`;
    
    // Show static effect
    static.style.opacity = '0.3';
    
    // Switch channel with delay for effect
    setTimeout(() => {
        if (window.player) {
            window.player.loadVideoById(channel.videoId);
            updateChannelInfo(channel);
        }
    }, 500);
}

function switchToNextChannel() {
    const currentIndex = parseInt(document.querySelector('.channel-button.active').textContent.replace('CH', '')) - 1;
    const nextIndex = (currentIndex + 1) % YOUTUBE_CONFIG.channels.length;
    switchChannel(nextIndex);
}

function updateChannelInfo(channel) {
    const info = document.getElementById('channelInfo');
    info.textContent = channel.name;
}

function showErrorScreen() {
    const container = document.getElementById('ytplayer');
    container.innerHTML = `
        <div class="error-screen">
            <h3>Signal Lost</h3>
            <p>Attempting to reestablish connection...</p>
        </div>
    `;
    
    // Retry connection after delay
    setTimeout(() => {
        initPlayer();
    }, YOUTUBE_CONFIG.retryDelay);
}