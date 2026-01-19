// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Gallery Slider
const gallerySlider = document.getElementById('gallery-slider');
const galleryDots = document.getElementById('gallery-dots');
const galleryPrevBtn = document.getElementById('gallery-prev');
const galleryNextBtn = document.getElementById('gallery-next');
let currentSlide = 0;
let autoSlideInterval;

const photoFiles = [
    'WhatsApp Image 2026-01-14 at 16.11.16 (1).jpeg',
    'WhatsApp Image 2026-01-14 at 16.11.16.jpeg',
    'WhatsApp Image 2026-01-14 at 16.11.17 (1).jpeg',
    'WhatsApp Image 2026-01-14 at 16.11.17.jpeg',
    'WhatsApp Image 2026-01-14 at 16.11.18.jpeg',
    'WhatsApp Image 2026-01-14 at 16.11.19 (1).jpeg',
    'WhatsApp Image 2026-01-14 at 16.11.19.jpeg',
    'WhatsApp Image 2026-01-14 at 16.11.21 (1).jpeg',
    'WhatsApp Image 2026-01-14 at 16.11.21 (2).jpeg',
    'WhatsApp Image 2026-01-14 at 16.11.21.jpeg',
    'WhatsApp Image 2026-01-14 at 23.58.59.jpeg'
];

function loadGallery() {
    if (!gallerySlider || !galleryDots) return;
    
    // Create slides
    photoFiles.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.style.opacity = '0';
        slide.style.animation = `fadeIn 0.6s ease ${index * 0.1}s forwards`;
        
        const img = document.createElement('img');
        const encodedPhoto = encodeURIComponent(photo);
        img.src = `photos/${encodedPhoto}`;
        img.alt = `Wedding Photo ${index + 1}`;
        img.loading = index === 0 ? 'eager' : 'lazy';
        
        img.onload = function() {
            slide.style.opacity = '1';
        };
        
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect fill="%23F5DEB3" width="1200" height="600"/%3E%3Ctext fill="%23654321" font-family="Arial" font-size="40" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EPhoto%3C/text%3E%3C/svg%3E';
            slide.style.opacity = '1';
        };
        
        slide.appendChild(img);
        slide.addEventListener('click', () => openLightbox(img.src, index));
        gallerySlider.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = 'gallery-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        galleryDots.appendChild(dot);
    });
    
    // Navigation buttons
    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    
    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
    
    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    
    gallerySlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoSlide();
    });
    
    gallerySlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    gallerySlider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide - 1);
            }
        }
        isDragging = false;
        startAutoSlide();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('gallery') && isElementInViewport(document.getElementById('gallery'))) {
            if (e.key === 'ArrowLeft') {
                goToSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentSlide + 1);
            }
        }
    });
    
    // Start auto-slide
    startAutoSlide();
}

function goToSlide(index) {
    if (!gallerySlider) return;
    
    const slides = gallerySlider.querySelectorAll('.gallery-slide');
    const dots = galleryDots.querySelectorAll('.gallery-dot');
    
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    
    const slideWidth = slides[0].offsetWidth + 32; // Include gap
    gallerySlider.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    // Reset auto-slide timer
    stopAutoSlide();
    startAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Enhanced lightbox functionality with navigation
let currentImageIndex = 0;
let lightboxImages = [];

function openLightbox(imageSrc, index = 0) {
    currentImageIndex = index;
    // Get images from slider slides
    const slides = document.querySelectorAll('.gallery-slide img');
    lightboxImages = Array.from(slides).map(img => img.src);
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    `;
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        line-height: 40px;
    `;
    
    // Navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '‹';
    prevBtn.style.cssText = `
        position: absolute;
        left: -60px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 50px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '›';
    nextBtn.style.cssText = `
        position: absolute;
        right: -60px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 50px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    function updateImage(index) {
        if (index >= 0 && index < lightboxImages.length) {
            currentImageIndex = index;
            img.src = lightboxImages[currentImageIndex];
            prevBtn.style.display = currentImageIndex === 0 ? 'none' : 'flex';
            nextBtn.style.display = currentImageIndex === lightboxImages.length - 1 ? 'none' : 'flex';
        }
    }
    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            updateImage(currentImageIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImageIndex < lightboxImages.length - 1) {
            updateImage(currentImageIndex + 1);
        }
    });
    
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }, 300);
    }
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function handleKeyPress(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeyPress);
        } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
            updateImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight' && currentImageIndex < lightboxImages.length - 1) {
            updateImage(currentImageIndex + 1);
        }
    });
    
    imgContainer.appendChild(img);
    imgContainer.appendChild(closeBtn);
    if (lightboxImages.length > 1) {
        imgContainer.appendChild(prevBtn);
        imgContainer.appendChild(nextBtn);
    }
    lightbox.appendChild(imgContainer);
    document.body.appendChild(lightbox);
    
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    updateImage(currentImageIndex);
}

// RSVP Form Handling - Removed (RSVP section has been removed from the website)

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    observer.observe(item);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Hero background illustration is now handled directly in HTML/CSS

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    
    // Story illustration is now handled directly in HTML
    
    // Initialize back to top button
    if (backToTopBtn) {
        backToTopBtn.style.display = 'flex';
    }
    
    // Force "Shweta Pandey" to be visible
    const shwetaName = document.getElementById('shweta-name');
    if (shwetaName) {
        shwetaName.style.display = 'block';
        shwetaName.style.visibility = 'visible';
        shwetaName.style.opacity = '1';
        shwetaName.style.color = '#ffffff';
        shwetaName.style.zIndex = '1000';
        shwetaName.style.position = 'relative';
        console.log('Shweta Pandey element found and made visible');
    } else {
        console.error('Shweta Pandey element not found!');
    }
    
    // Also check first hero-name
    const firstHeroName = document.querySelector('.hero-names .hero-name:first-child');
    if (firstHeroName) {
        firstHeroName.style.display = 'block';
        firstHeroName.style.visibility = 'visible';
        firstHeroName.style.opacity = '1';
        console.log('First hero name element found and made visible');
    }
    
    // Initialize countdown timer
    createCountdown();
    
    // Ensure countdown timer is visible
    const countdownTimer = document.getElementById('countdown-timer');
    
    // Initialize background music with fade in/out
    initBackgroundMusic();
    if (countdownTimer) {
        countdownTimer.style.display = 'block';
        countdownTimer.style.visibility = 'visible';
        countdownTimer.style.opacity = '1';
        countdownTimer.style.zIndex = '100';
        countdownTimer.style.position = 'relative';
        console.log('Countdown timer initialized and made visible');
    } else {
        console.error('Countdown timer element not found!');
    }
});

// Add parallax effect to hero section (disabled to prevent timer clipping)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    // Disable parallax transform to prevent timer clipping
    // if (hero && scrolled < window.innerHeight) {
    //     hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    // }
    // Ensure hero doesn't clip content
    if (hero) {
        hero.style.overflow = 'visible';
        hero.style.clip = 'auto';
    }
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Countdown timer
function createCountdown() {
    const weddingDate = new Date('2026-02-19T19:00:00').getTime();
    const countdownElement = document.getElementById('countdown-timer');
    
    if (!countdownElement) return;
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="countdown-container">
                    <div class="countdown-item">
                        <div class="countdown-number">${days}</div>
                        <div class="countdown-label">Days</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-number">${hours}</div>
                        <div class="countdown-label">Hours</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-number">${minutes}</div>
                        <div class="countdown-label">Minutes</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-number">${seconds}</div>
                        <div class="countdown-label">Seconds</div>
                    </div>
                </div>
            `;
        } else {
            countdownElement.innerHTML = '<div class="countdown-message">The wedding celebration has begun! 🎉</div>';
        }
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second
}

// Background Music with Fade In/Out
function initBackgroundMusic() {
    const audio = document.getElementById('background-music');
    if (!audio) return;
    
    // Set initial volume to 0 for fade in
    audio.volume = 0;
    
    // Fade duration in seconds
    const fadeInDuration = 1; // 1 second fade in
    const fadeOutDuration = 2; // 2 seconds fade out
    const maxVolume = 0.5; // 50% volume (increased for better audibility)
    
    let clipDuration = 0; // Will be set when audio metadata loads
    let isFadingOut = false;
    let fadeOutInterval = null;
    
    // Function to fade in
    function fadeIn() {
        // Clear any existing fade out interval
        if (fadeOutInterval) {
            clearInterval(fadeOutInterval);
            fadeOutInterval = null;
        }
        isFadingOut = false;
        
        const fadeInInterval = setInterval(() => {
            if (audio.volume < maxVolume) {
                audio.volume = Math.min(audio.volume + (maxVolume / (fadeInDuration * 10)), maxVolume);
            } else {
                clearInterval(fadeInInterval);
            }
        }, 100);
    }
    
    // Function to fade out
    function fadeOut() {
        if (isFadingOut) return; // Prevent multiple fade out calls
        isFadingOut = true;
        
        if (fadeOutInterval) {
            clearInterval(fadeOutInterval);
        }
        
        fadeOutInterval = setInterval(() => {
            if (audio.volume > 0) {
                audio.volume = Math.max(audio.volume - (maxVolume / (fadeOutDuration * 10)), 0);
            } else {
                clearInterval(fadeOutInterval);
                fadeOutInterval = null;
            }
        }, 100);
    }
    
    // Get the actual duration of the audio file
    audio.addEventListener('loadedmetadata', () => {
        clipDuration = audio.duration;
        console.log('Audio duration:', clipDuration, 'seconds');
    });
    
    // Handle timeupdate to fade out before loop
    audio.addEventListener('timeupdate', () => {
        if (!clipDuration) return; // Wait for metadata to load
        
        const currentTime = audio.currentTime;
        const timeUntilEnd = clipDuration - currentTime;
        
        // Start fade out 2 seconds before the end
        if (timeUntilEnd <= fadeOutDuration && audio.volume > 0 && !isFadingOut) {
            fadeOut();
        }
        
        // Reset and fade in when looping (at the end)
        if (currentTime >= clipDuration - 0.1) {
            audio.currentTime = 0;
            audio.volume = 0;
            isFadingOut = false;
            setTimeout(() => {
                fadeIn();
            }, 100);
        }
    });
    
    // Function to start music (called on user interaction)
    let musicStarted = false;
    const startMusic = (event) => {
        if (musicStarted) return;
        
        console.log('User interaction detected, starting music...', event?.type);
        
        // Chrome requires audio.play() to be called directly from user gesture handler
        try {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        musicStarted = true;
                        fadeIn();
                        console.log('Music started successfully');
                        // Remove all listeners after successful start
                        document.removeEventListener('click', startMusic);
                        document.removeEventListener('touchstart', startMusic);
                        document.removeEventListener('scroll', startMusic);
                        document.removeEventListener('keydown', startMusic);
                        document.removeEventListener('mousemove', startMusic);
                        window.removeEventListener('focus', startMusic);
                    })
                    .catch(err => {
                        console.error('Error playing audio:', err);
                    });
            } else {
                // Fallback: try direct play
                audio.play();
                musicStarted = true;
                fadeIn();
            }
        } catch (err) {
            console.error('Error in startMusic:', err);
        }
    };
    
    // Try to play on page load (may require user interaction due to browser policies)
    const tryPlay = () => {
        console.log('Attempting to play audio...');
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Autoplay started, begin fade in
                    console.log('Audio playing, starting fade in...');
                    musicStarted = true;
                    fadeIn();
                })
                .catch(error => {
                    // Autoplay was prevented, wait for user interaction
                    console.log('Autoplay prevented. Music will start after user interaction.', error);
                    
                    // Add listeners for multiple interaction types (Chrome needs this)
                    // Use capture phase and make sure it's immediate
                    document.addEventListener('click', startMusic, { once: true, capture: true });
                    document.addEventListener('touchstart', startMusic, { once: true, capture: true });
                    document.addEventListener('scroll', startMusic, { once: true, capture: true });
                    document.addEventListener('keydown', startMusic, { once: true, capture: true });
                    document.addEventListener('mousemove', startMusic, { once: true, capture: true });
                    window.addEventListener('focus', startMusic, { once: true });
                });
        } else {
            // Fallback: add listeners anyway
            document.addEventListener('click', startMusic, { once: true });
            document.addEventListener('touchstart', startMusic, { once: true });
            document.addEventListener('scroll', startMusic, { once: true });
            document.addEventListener('keydown', startMusic, { once: true });
            document.addEventListener('mousemove', startMusic, { once: true });
        }
    };
    
    // Preload the audio
    audio.preload = 'auto';
    
    // Wait for audio to be ready
    audio.addEventListener('loadeddata', () => {
        console.log('Audio loaded, duration:', audio.duration);
        tryPlay();
    });
    
    audio.addEventListener('canplay', () => {
        console.log('Audio can play');
    });
    
    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        console.error('Audio error details:', audio.error);
    });
    
    // Also try immediately if audio is already loaded
    if (audio.readyState >= 2) {
        console.log('Audio already loaded, trying to play...');
        tryPlay();
    }
    
    // Force load the audio
    audio.load();
}
