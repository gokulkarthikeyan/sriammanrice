// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Remove observer after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Separate observer for text elements with different threshold
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            textObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.card, .feature-card, .product-card, .service-card, .gallery-item, .contact-item, .packaging-card, .review-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Add text animations to headings and paragraphs
    const textElements = document.querySelectorAll('h2, h3, h4, .section-subtitle, .about-intro p, .hero-description p, .card p, .contact-info p, .contact-info h3, .contact-form-container h3, .packaging-title, .product-slogan p, .review-text, .review-author');
    
    textElements.forEach((el, index) => {
        // Skip if already has animation class
        if (el.classList.contains('section-title') || el.classList.contains('company-title') || el.classList.contains('hero-title')) {
            return;
        }
        
        // Add animation class based on element type
        if (el.tagName === 'H2' || el.classList.contains('section-title')) {
            el.classList.add('text-animate');
        } else if (el.tagName === 'H3') {
            // Alternate between left and right for h3 elements
            if (index % 2 === 0) {
                el.classList.add('text-animate-left');
            } else {
                el.classList.add('text-animate-right');
            }
        } else {
            el.classList.add('text-animate');
        }
        
        // Add delay based on index for staggered effect
        el.style.transitionDelay = `${(index % 5) * 0.1}s`;
        textObserver.observe(el);
    });

    // Animate list items with stagger
    const listItems = document.querySelectorAll('.mission-list li, .footer-links li');
    listItems.forEach((item, index) => {
        item.classList.add('text-animate');
        item.style.transitionDelay = `${index * 0.1}s`;
        textObserver.observe(item);
    });

    // Animate card titles and descriptions
    const cardTexts = document.querySelectorAll('.card-title, .product-card h3, .product-card p, .service-card h3, .service-card p, .feature-card p, .review-card p');
    cardTexts.forEach((el, index) => {
        if (!el.classList.contains('text-animate') && !el.classList.contains('text-animate-left') && !el.classList.contains('text-animate-right')) {
            el.classList.add('text-animate');
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
            textObserver.observe(el);
        }
    });

    // Animate founder cards on scroll
    const founderCards = document.querySelectorAll('.founder-card');
    founderCards.forEach((card, index) => {
        card.classList.add('text-animate-scale');
        card.style.transitionDelay = `${index * 0.2}s`;
        textObserver.observe(card);
    });

    // Feature card count up animations
    const statCards = document.querySelectorAll('.feature-card[data-count]');
    statCards.forEach(card => {
        const target = parseInt(card.dataset.count, 10);
        const suffix = card.dataset.suffix || '+';
        const valueEl = card.querySelector('.feature-count-value');
        const suffixEl = card.querySelector('.feature-count-suffix');
        if (suffixEl) {
            suffixEl.textContent = suffix;
        }
        let counting = false;

        const runCount = () => {
            if (counting || !valueEl || Number.isNaN(target)) return;
            counting = true;
            const duration = 1200;
            const start = performance.now();

            const update = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                valueEl.textContent = Math.round(progress * target);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    valueEl.textContent = target;
                }
            };

            requestAnimationFrame(update);
        };

        card.addEventListener('mouseenter', runCount, { once: true });
        card.addEventListener('touchstart', runCount, { once: true });
    });
});

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCategory = document.getElementById('lightbox-category');

let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    const currentItem = galleryItems[currentImageIndex];
    const caption = currentItem.getAttribute('data-caption');
    const category = currentItem.getAttribute('data-category');
    const imageSrc = currentItem.getAttribute('data-image');
    
    lightboxCaption.textContent = caption;
    lightboxCategory.textContent = category;
    
    // Update lightbox image if it exists
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxPlaceholder = document.querySelector('.lightbox-placeholder');
    if (lightboxImg && imageSrc) {
        lightboxImg.src = imageSrc;
        lightboxImg.alt = category;
        lightboxImg.onload = function() {
            lightboxImg.style.display = 'block';
            if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'none';
        };
        lightboxImg.onerror = function() {
            lightboxImg.style.display = 'none';
            if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'flex';
        };
    } else {
        if (lightboxImg) lightboxImg.style.display = 'none';
        if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'flex';
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    }
    
    const currentItem = galleryItems[currentImageIndex];
    const caption = currentItem.getAttribute('data-caption');
    const category = currentItem.getAttribute('data-category');
    const imageSrc = currentItem.getAttribute('data-image');
    
    lightboxCaption.textContent = caption;
    lightboxCategory.textContent = category;
    
    // Update lightbox image if it exists
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxPlaceholder = document.querySelector('.lightbox-placeholder');
    if (lightboxImg && imageSrc) {
        lightboxImg.src = imageSrc;
        lightboxImg.alt = category;
        lightboxImg.onload = function() {
            lightboxImg.style.display = 'block';
            if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'none';
        };
        lightboxImg.onerror = function() {
            lightboxImg.style.display = 'none';
            if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'flex';
        };
    } else {
        if (lightboxImg) lightboxImg.style.display = 'none';
        if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'flex';
    }
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', () => navigateLightbox('next'));
}

// Close lightbox when clicking outside
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !phone) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Format message for WhatsApp - clean and professional
        const formattedMessage = `*New Contact Form Inquiry*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📱 *Phone:* ${phone}\n💬 *Message:*\n${message || 'No message provided'}\n\n_This message was sent from Sri Amman Modern Rice Mill website_`;
        
        // Encode message for URL - using proper encoding
        const encodedMessage = encodeURIComponent(formattedMessage);
        
        // Phone number (8248634848)
        const phoneNumber = '8248634848';
        
        // Create WhatsApp URL - this will open WhatsApp with message in the text box
        const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp directly - message will appear in the chat text box
        window.location.href = whatsappUrl;
        
        // Show success message
        formSuccess.style.display = 'flex';
        formSuccess.innerHTML = '<i class="fab fa-whatsapp"></i><p>Opening WhatsApp... Your message is ready. Please click SEND to deliver.</p>';
        
        // Reset form after a delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 2000);
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
            formSuccess.innerHTML = '<i class="fas fa-check-circle"></i><p>Thank you! Your message has been sent successfully.</p>';
        }, 10000);
        
        // Log for debugging
        console.log('Form submitted:', { name, email, phone, message });
        console.log('WhatsApp URL:', whatsappUrl);
    });
}

// ===== PROCESS GALLERY =====
let currentProcessGallery = null;
let currentProcessIndex = 0;
const processGalleries = {
    harvesting: [
        '/images/CROP.jpg',
        '/images/paddy.jpg',
        '/images/Rice.jpg'
    ],
    transportation: [
        '/images/trans.jpg',
        '/images/trans2.jpg'
    ],
    processing: [
        '/images/proc1.jpg',
        '/images/proc2.jpg',
        '/images/proc3.jpg',
        '/images/proc4.jpg'
    ],
    packaging: [
        '/images/packing.jpg',
        '/images/hygimg.jpg'
    ],
    sorting: [
        '/images/sorting.webp'
    ],
    supply: [
        '/images/delivery.jpg'
    ]
};

function showProcessGallery(type) {
    currentProcessGallery = type;
    currentProcessIndex = 0;
    const gallery = document.getElementById('process-gallery');
    const slider = document.getElementById('process-gallery-slider');
    
    if (!processGalleries[type]) return;
    
    slider.innerHTML = '';
    processGalleries[type].forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'process-gallery-slide';
        if (index === 0) slide.classList.add('active');
        slide.innerHTML = `<img src="${img}" alt="${type} ${index + 1}">`;
        slider.appendChild(slide);
    });
    
    gallery.style.display = 'flex';
    updateProcessGallery();
}

function closeProcessGallery() {
    document.getElementById('process-gallery').style.display = 'none';
}

function updateProcessGallery() {
    const slides = document.querySelectorAll('.process-gallery-slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentProcessIndex);
    });
}

function nextProcessSlide() {
    if (!currentProcessGallery) return;
    const total = processGalleries[currentProcessGallery].length;
    currentProcessIndex = (currentProcessIndex + 1) % total;
    updateProcessGallery();
}

function prevProcessSlide() {
    if (!currentProcessGallery) return;
    const total = processGalleries[currentProcessGallery].length;
    currentProcessIndex = (currentProcessIndex - 1 + total) % total;
    updateProcessGallery();
}

// Auto-slide process gallery
setInterval(() => {
    const gallery = document.getElementById('process-gallery');
    if (gallery && gallery.style.display === 'flex') {
        nextProcessSlide();
    }
}, 3000);

// Process gallery event listeners
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.process-gallery-close');
    const nextBtn = document.querySelector('.process-gallery-next');
    const prevBtn = document.querySelector('.process-gallery-prev');
    const gallery = document.getElementById('process-gallery');
    
    if (closeBtn) closeBtn.addEventListener('click', closeProcessGallery);
    if (nextBtn) nextBtn.addEventListener('click', nextProcessSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevProcessSlide);
    if (gallery) gallery.addEventListener('click', (e) => {
        if (e.target === gallery) closeProcessGallery();
    });
});

// ===== HERO CAROUSEL =====
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}

// Auto-rotate hero carousel
setInterval(nextHeroSlide, 4000);

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ACTIVE NAVIGATION LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = header.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
        }
    }
});

// ===== ADD FADE-IN ANIMATION TO SECTIONS =====
const sectionsToAnimate = document.querySelectorAll('.section');
sectionsToAnimate.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
    section.classList.add('fade-in-up');
});

// ===== HOVER EFFECTS FOR CARDS =====
document.querySelectorAll('.card, .feature-card, .product-card, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== FORM INPUT ANIMATIONS =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
    
    // Set initial scroll top button state
    if (scrollTopBtn) {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
        scrollTopBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
    
    console.log('Sri Amman Modern Rice Mill website loaded successfully!');
});

