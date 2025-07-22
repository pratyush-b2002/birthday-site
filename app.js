// Romantic Birthday Website for Aishanee - JavaScript
// Handles all interactive functionality with proper error handling

// Global variables
let youtubePlayer = null;
let isPhotoRevealed = false;
let isMusicPlaying = false;
let nameValidated = false;

// Valid names for Aishanee (case-insensitive)
const validNames = [
    'aishanee',
    'aishanee bhattacharya'
];

// YouTube video ID
const YOUTUBE_VIDEO_ID = 'd4OMqGKBl6E';

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Initializing romantic birthday website for Aishanee...');
    setTimeout(() => {
        initializeWebsite();
    }, 100);
});

// Initialize all website functionality
function initializeWebsite() {
    setupEventListeners();
    createContinuousAnimations();
    
    // Initialize YouTube API when ready
    if (typeof YT !== 'undefined' && YT.Player) {
        initializeYouTubePlayer();
    }
    
    console.log('💖 Website ready for Aishanee\'s birthday surprise!');
}

// Setup all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Name input field
    const nameInput = document.getElementById('name-input');
    const enterButton = document.getElementById('enter-surprise');
    
    if (nameInput) {
        console.log('Name input found, setting up listeners');
        nameInput.addEventListener('input', handleNameInput);
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && nameValidated) {
                e.preventDefault();
                handleEnterSurprise();
            }
        });
    } else {
        console.error('Name input not found!');
    }
    
    if (enterButton) {
        console.log('Enter button found, setting up listener');
        enterButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleEnterSurprise();
        });
    } else {
        console.error('Enter button not found!');
    }
    
    // Photo window click
    const photoWindow = document.getElementById('photo-window');
    if (photoWindow) {
        photoWindow.addEventListener('click', handlePhotoReveal);
    }
    
    // Music player controls
    const playButton = document.getElementById('play-music');
    const stopButton = document.getElementById('stop-music');
    
    if (playButton) {
        playButton.addEventListener('click', handlePlayMusic);
    }
    
    if (stopButton) {
        stopButton.addEventListener('click', handleStopMusic);
    }
    
    // Back to start button
    const backButton = document.getElementById('back-to-start');
    if (backButton) {
        backButton.addEventListener('click', handleBackToStart);
    }
}

// Handle name input validation
function handleNameInput(e) {
    const input = e.target.value.toLowerCase().trim();
    const errorMessage = document.getElementById('error-message');
    const enterButton = document.getElementById('enter-surprise');
    
    console.log('Name input changed:', input);
    
    // Check if name matches valid names
    nameValidated = validNames.includes(input);
    console.log('Name validated:', nameValidated);
    
    if (nameValidated) {
        // Valid name - enable button and hide error
        if (enterButton) {
            enterButton.classList.remove('disabled');
            enterButton.removeAttribute('disabled');
            enterButton.style.pointerEvents = 'auto';
            enterButton.style.opacity = '1';
            console.log('Button enabled');
        }
        if (errorMessage) {
            errorMessage.classList.add('hidden');
        }
        
        // Add success animation to input
        e.target.style.borderColor = 'rgba(76, 175, 80, 0.6)';
        e.target.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.3)';
        
    } else if (input.length > 0) {
        // Invalid name - show error
        if (enterButton) {
            enterButton.classList.add('disabled');
            enterButton.setAttribute('disabled', 'true');
            enterButton.style.pointerEvents = 'none';
            enterButton.style.opacity = '0.5';
            console.log('Button disabled - invalid name');
        }
        if (errorMessage) {
            errorMessage.classList.remove('hidden');
        }
        
        // Add error animation to input
        e.target.style.borderColor = 'rgba(255, 84, 89, 0.6)';
        e.target.style.boxShadow = '0 0 20px rgba(255, 84, 89, 0.3)';
        
    } else {
        // Empty input - reset state
        nameValidated = false;
        if (enterButton) {
            enterButton.classList.add('disabled');
            enterButton.setAttribute('disabled', 'true');
            enterButton.style.pointerEvents = 'none';
            enterButton.style.opacity = '0.5';
            console.log('Button disabled - empty input');
        }
        if (errorMessage) {
            errorMessage.classList.add('hidden');
        }
        
        // Reset input styling
        e.target.style.borderColor = '';
        e.target.style.boxShadow = '';
    }
}

// Handle entering the surprise
function handleEnterSurprise() {
    console.log('Enter surprise clicked, nameValidated:', nameValidated);
    
    if (!nameValidated) {
        console.log('Name not validated, cannot proceed');
        return;
    }
    
    console.log('🎉 Aishanee is entering her birthday surprise!');
    
    // Add click effect
    createClickEffect();
    
    // Smooth transition to birthday page
    setTimeout(() => {
        transitionToPage('birthday-page');
    }, 300);
}

// Handle photo window reveal
function handlePhotoReveal() {
    if (isPhotoRevealed) return;
    
    console.log('📸 Revealing Aishanee\'s special photo...');
    
    const clickToOpen = document.querySelector('.click-to-open');
    const birthdayImage = document.getElementById('birthday-image');
    const imageFallback = document.getElementById('image-fallback');
    
    // Hide click prompt
    if (clickToOpen) {
        clickToOpen.style.transition = 'all 0.5s ease';
        clickToOpen.style.opacity = '0';
        clickToOpen.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            clickToOpen.style.display = 'none';
        }, 500);
    }
    
    // Try to show the image
    if (birthdayImage) {
        birthdayImage.onload = function() {
            console.log('Image loaded successfully');
            this.classList.remove('hidden');
            isPhotoRevealed = true;
            createHeartBurst();
        };
        
        birthdayImage.onerror = function() {
            console.log('Image failed to load, showing fallback');
            // Image failed to load, show fallback
            if (imageFallback) {
                imageFallback.classList.remove('hidden');
                isPhotoRevealed = true;
            }
        };
        
        // Check if image is already loaded
        if (birthdayImage.complete && birthdayImage.naturalWidth > 0) {
            birthdayImage.onload();
        } else {
            // Force reload to trigger load/error events
            const currentSrc = birthdayImage.src;
            birthdayImage.src = '';
            birthdayImage.src = currentSrc;
        }
    }
    
    // Add window animation
    const photoWindow = document.getElementById('photo-window');
    if (photoWindow) {
        photoWindow.style.transform = 'scale(1.05)';
        setTimeout(() => {
            photoWindow.style.transform = '';
        }, 300);
    }
}

// Handle play music
function handlePlayMusic() {
    console.log('🎵 Starting birthday music for Aishanee...');
    const audio = document.getElementById('birthday-audio');
    const playButton = document.getElementById('play-music');
    const stopButton = document.getElementById('stop-music');

    if (audio) {
        audio.play().then(() => {
            isMusicPlaying = true;
            playButton?.classList.add('hidden');
            stopButton?.classList.remove('hidden');

            const musicInfo = document.querySelector('.music-info p');
            if (musicInfo) {
                musicInfo.textContent = '🎶 Playing your special birthday song! 🎶';
            }

            createMusicWaves();
        }).catch(err => {
            console.error('Audio play failed:', err);
            showMusicError();
        });
    }
}

// Handle stop music
function handleStopMusic() {
    const audio = document.getElementById('birthday-audio');
    const playButton = document.getElementById('play-music');
    const stopButton = document.getElementById('stop-music');

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        isMusicPlaying = false;
        playButton?.classList.remove('hidden');
        stopButton?.classList.add('hidden');

        const musicInfo = document.querySelector('.music-info p');
        if (musicInfo) {
            musicInfo.textContent = '🎶 Click to start the celebration music 🎶';
        }
    }
}

// Handle back to start
function handleBackToStart() {
    console.log('🏠 Going back to start...');
    
    // Reset all states
    isPhotoRevealed = false;
    nameValidated = false;
    
    // Stop music if playing
    if (isMusicPlaying) {
        handleStopMusic();
    }
    
    // Reset name input
    const nameInput = document.getElementById('name-input');
    if (nameInput) {
        nameInput.value = '';
        nameInput.style.borderColor = '';
        nameInput.style.boxShadow = '';
        
        // Trigger input event to reset button state
        nameInput.dispatchEvent(new Event('input'));
    }
    
    // Reset photo window
    resetPhotoWindow();
    
    // Transition back to name entry page
    setTimeout(() => {
        transitionToPage('name-entry-page');
    }, 300);
}

// Reset photo window to initial state
function resetPhotoWindow() {
    const clickToOpen = document.querySelector('.click-to-open');
    const birthdayImage = document.getElementById('birthday-image');
    const imageFallback = document.getElementById('image-fallback');
    
    if (clickToOpen) {
        clickToOpen.style.display = 'block';
        clickToOpen.style.opacity = '1';
        clickToOpen.style.transform = 'scale(1)';
    }
    
    if (birthdayImage) {
        birthdayImage.classList.add('hidden');
    }
    
    if (imageFallback) {
        imageFallback.classList.add('hidden');
    }
}

// Transition between pages
function transitionToPage(pageId) {
    console.log('Transitioning to page:', pageId);
    
    const currentPage = document.querySelector('.page.active');
    const targetPage = document.getElementById(pageId);
    
    if (!targetPage) {
        console.error('Target page not found:', pageId);
        return;
    }
    
    // Fade out current page
    if (currentPage) {
        currentPage.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        currentPage.style.opacity = '0';
        currentPage.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            currentPage.classList.remove('active');
        }, 400);
    }
    
    // Fade in target page
    setTimeout(() => {
        targetPage.classList.add('active');
        targetPage.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'translateY(0)';
        }, 50);
    }, 400);
}

// YouTube API functions
function onYouTubeIframeAPIReady() {
    console.log('🎵 YouTube API ready, initializing player...');
    initializeYouTubePlayer();
}

// Make this function globally available
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function initializeYouTubePlayer() {
    const container = document.getElementById('youtube-player');
    if (!container) {
        console.error('YouTube container not found');
        return;
    }
    
    try {
        youtubePlayer = new YT.Player('youtube-player', {
            height: '1',
            width: '1',
            videoId: YOUTUBE_VIDEO_ID,
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                playsinline: 1,
                rel: 0
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
                onError: onPlayerError
            }
        });
        console.log('YouTube player initialized');
    } catch (error) {
        console.error('Error initializing YouTube player:', error);
        showMusicError();
    }
}

function onPlayerReady(event) {
    console.log('🎵 YouTube player ready!');
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        // Music ended
        isMusicPlaying = false;
        const playButton = document.getElementById('play-music');
        const stopButton = document.getElementById('stop-music');
        
        if (playButton) playButton.classList.remove('hidden');
        if (stopButton) stopButton.classList.add('hidden');
        
        const musicInfo = document.querySelector('.music-info p');
        if (musicInfo) {
            musicInfo.textContent = '🎶 Song finished! Click to play again 🎶';
        }
    }
}

function onPlayerError(event) {
    console.error('YouTube player error:', event.data);
    showMusicError();
}

function showMusicError() {
    const musicInfo = document.querySelector('.music-info p');
    if (musicInfo) {
        musicInfo.textContent = '🎵 Music temporarily unavailable - but the love is still here! 💕';
        musicInfo.style.color = 'rgba(255, 255, 255, 0.8)';
    }
}

// Animation and effect functions
function createClickEffect() {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 182, 193, 0.4))';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'clickRipple 0.6s ease-out';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function createHeartBurst() {
    const hearts = ['💖', '💕', '🌸', '💝', '✨', '🌺'];
    const photoWindow = document.getElementById('photo-window');
    
    if (!photoWindow) return;
    
    const rect = photoWindow.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = '1.5rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9998';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            document.body.appendChild(heart);
            
            // Random direction for burst effect
            const angle = (i * 45) * Math.PI / 180;
            const distance = 100 + Math.random() * 50;
            const targetX = centerX + Math.cos(angle) * distance;
            const targetY = centerY + Math.sin(angle) * distance;
            
            // Animate heart
            let opacity = 1;
            let currentX = centerX;
            let currentY = centerY;
            
            const animateHeart = setInterval(() => {
                opacity -= 0.02;
                currentX += (targetX - currentX) * 0.1;
                currentY += (targetY - currentY) * 0.1;
                
                heart.style.opacity = opacity;
                heart.style.left = currentX + 'px';
                heart.style.top = currentY + 'px';
                heart.style.transform = `scale(${1 + (1 - opacity)}) rotate(${(1 - opacity) * 360}deg)`;
                
                if (opacity <= 0) {
                    clearInterval(animateHeart);
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }
            }, 50);
        }, i * 100);
    }
}

function createMusicWaves() {
    const musicPlayer = document.querySelector('.music-player');
    if (!musicPlayer) return;
    
    const waves = [];
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.style.position = 'absolute';
        wave.style.top = '50%';
        wave.style.left = '50%';
        wave.style.width = '100%';
        wave.style.height = '100%';
        wave.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        wave.style.borderRadius = '50%';
        wave.style.transform = 'translate(-50%, -50%) scale(1)';
        wave.style.pointerEvents = 'none';
        wave.style.animation = `musicWave 2s ease-out infinite ${i * 0.5}s`;
        
        musicPlayer.style.position = 'relative';
        musicPlayer.appendChild(wave);
        waves.push(wave);
    }
    
    // Remove waves after some time if music is stopped
    setTimeout(() => {
        if (!isMusicPlaying) {
            waves.forEach(wave => {
                if (wave.parentNode) {
                    wave.parentNode.removeChild(wave);
                }
            });
        }
    }, 5000);
}

function createContinuousAnimations() {
    // Create additional floating hearts periodically
    setInterval(() => {
        createRandomFloatingHeart();
    }, 4000);
    
    // Create particles periodically
    setInterval(() => {
        createRandomParticle();
    }, 2000);
}

function createRandomFloatingHeart() {
    const hearts = ['💖', '💕', '🌸', '💝', '✨', '🌺', '💗', '🌙', '⭐'];
    const heart = document.createElement('div');
    
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '110vh';
    heart.style.fontSize = (1 + Math.random()) + 'rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';
    heart.style.opacity = '0.7';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    document.body.appendChild(heart);
    
    // Float up animation
    let position = window.innerHeight + 50;
    let rotation = 0;
    
    const floatAnimation = setInterval(() => {
        position -= 2;
        rotation += 2;
        
        heart.style.top = position + 'px';
        heart.style.transform = `translateX(${Math.sin(position * 0.01) * 50}px) rotate(${rotation}deg)`;
        heart.style.opacity = Math.max(0.1, Math.sin(position * 0.01) * 0.7 + 0.3);
        
        if (position < -100) {
            clearInterval(floatAnimation);
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }
    }, 50);
}

function createRandomParticle() {
    const particle = document.createElement('div');
    
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '110vh';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 182, 193, 0.4))';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    
    document.body.appendChild(particle);
    
    // Float up animation
    let position = window.innerHeight + 10;
    
    const particleAnimation = setInterval(() => {
        position -= 1;
        
        particle.style.top = position + 'px';
        particle.style.transform = `translateX(${Math.sin(position * 0.02) * 30}px)`;
        particle.style.opacity = Math.max(0, (window.innerHeight - position) / window.innerHeight);
        
        if (position < -20) {
            clearInterval(particleAnimation);
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }
    }, 100);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes clickRipple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    @keyframes musicWave {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

// Console message for Aishanee
console.log(`
🌸💖🌸💖🌸💖🌸💖🌸💖🌸💖🌸💖🌸
💖                                     💖
🌸   Happy 22nd Birthday, Aishanee!    🌸
💖                                     💖
🌸   You are loved beyond measure! 💕  🌸
💖                                     💖
🌸💖🌸💖🌸💖🌸💖🌸💖🌸💖🌸💖🌸
`);

// Make functions available globally for debugging
window.aishaneeWebsite = {
    handlePlayMusic,
    handleStopMusic,
    createHeartBurst,
    createRandomFloatingHeart,
    nameValidated,
    youtubePlayer
};