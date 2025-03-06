// YouTube Player Script
document.addEventListener('DOMContentLoaded', function() {
    setupYouTubePlayer();
});

function setupYouTubePlayer() {
    const youtubePlayer = document.getElementById('youtubePlayer');
    
    // Retro TV frame HTML structure
    const tvHTML = `
        <div class="retro-tv">
            <div class="tv-frame">
                <div class="tv-screen">
                    <div class="tv-static" id="tvStatic"></div>
                    <div class="tv-content" id="videoContainer">
                        <!-- YouTube iframe will be inserted here -->
                        <div id="ytplayer"></div>
                    </div>
                </div>
                <div class="tv-controls">
                    <div class="tv-brand">OMNI CONSUMER PRODUCTS</div>
                    <div class="tv-knobs">
                        <div class="tv-knob"></div>
                        <div class="tv-knob"></div>
                        <div class="tv-channels">
                            <button data-video="9OBnvpzb560" class="channel-button">CH1</button>
                            <button data-video="jAXioRNYy4s" class="channel-button">CH2</button>
                            <button data-video="Xgda7RHzD8I" class="channel-button">CH3</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .retro-tv {
                width: 100%;
                margin: 0 auto;
                position: relative;
            }
            
            .tv-frame {
                background-color: #333;
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                position: relative;
                overflow: hidden;
            }
            
            .tv-frame::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%);
                pointer-events: none;
            }
            
            .tv-screen {
                background-color: #000;
                position: relative;
                width: 100%;
                padding-top: 56.25%; /* 16:9 Aspect Ratio */
                border-radius: 10px;
                overflow: hidden;
                box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
            }
            
            .tv-static {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNTUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHJlc3VsdD0idHVyYnVsZW5jZSIvPjxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+');
                opacity: 0.1;
                z-index: 1;
                pointer-events: none;
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
            
            .tv-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                margin-top: 15px;
            }
            
            .tv-brand {
                font-family: 'Courier New', monospace;
                font-weight: bold;
                font-size: 0.7rem;
                color: #aaa;
                text-transform: uppercase;
            }
            
            .tv-knobs {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .tv-knob {
                width: 15px;
                height: 15px;
                background-color: #666;
                border-radius: 50%;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
                cursor: pointer;
            }
            
            .tv-knob:hover {
                background-color: #888;
            }
            
            .tv-channels {
                display: flex;
                gap: 5px;
            }
            
            .channel-button {
                background-color: #222;
                color: #aaa;
                border: 1px solid #444;
                font-family: 'Courier New', monospace;
                font-size: 0.6rem;
                padding: 3px 6px;
                cursor: pointer;
            }
            
            .channel-button:hover {
                background-color: var(--primary-orange);
                color: #000;
            }
            
            .channel-button.active {
                background-color: var(--primary-blue);
                color: white;
            }
        </style>
    `;
    
    youtubePlayer.innerHTML = tvHTML;
    
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Setup global variables for YouTube player
    window.player = null;
    window.currentVideoId = '9OBnvpzb560'; // Default video (Media Break from RoboCop)
    
    // Setup channel buttons
    setupChannelButtons();
}

// Function called by YouTube API when ready
window.onYouTubeIframeAPIReady = function() {
    loadYouTubeVideo(window.currentVideoId);
    
    // Hide the static effect after video loads
    setTimeout(() => {
        document.getElementById('tvStatic').style.opacity = '0.05';
    }, 2000);
};

// Helper function to load YouTube video
function loadYouTubeVideo(videoId) {
    // If player already exists, just load new video
    if (window.player) {
        window.player.loadVideoById(videoId);
        return;
    }
    
    // Create new player
    window.player = new YT.Player('ytplayer', {
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1,
            'iv_load_policy': 3,
            'fs': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(50);
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // If video ends, show static effect more prominently
    if (event.data === YT.PlayerState.ENDED) {
        document.getElementById('tvStatic').style.opacity = '0.3';
    }
}

function setupChannelButtons() {
    const channelButtons = document.querySelectorAll('.channel-button');
    
    channelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show TV static effect when changing channels
            document.getElementById('tvStatic').style.opacity = '0.3';
            
            // Get video ID from data attribute
            const videoId = this.getAttribute('data-video');
            window.currentVideoId = videoId;
            
            // Change active button styling
            channelButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Add static effect and delay video loading for retro TV feel
            setTimeout(() => {
                loadYouTubeVideo(videoId);
                
                // Reduce static effect after video loads
                setTimeout(() => {
                    document.getElementById('tvStatic').style.opacity = '0.05';
                }, 1000);
            }, 500);
        });
    });
}
