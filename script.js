// RDR2 Encyclopedia - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
    
    // ===================================
    // Weapons Tabs
    // ===================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ===================================
    // Smooth Scroll for Navigation Links
    // ===================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Active Navigation Link on Scroll
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ===================================
    // Header Background on Scroll
    // ===================================
    const header = document.querySelector('.header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    
    // ===================================
    // Intersection Observer for Animations
    // ===================================
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
    
    // Observe cards and items for animation
    const animatedElements = document.querySelectorAll('.character-card, .guide-card, .fact-item, .weapon-card, .gallery-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===================================
    // Gallery Lightbox (Simple Implementation)
    // ===================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const placeholder = this.querySelector('.gallery-placeholder');
            const text = placeholder.querySelector('span').textContent;
            
            // Create simple alert for demo (in real implementation, this would open a lightbox)
            console.log(`Gallery item clicked: ${text}`);
        });
    });
    
    // ===================================
    // Character Cards Hover Effect Enhancement
    // ===================================
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ===================================
    // Facts Counter Animation
    // ===================================
    const factNumbers = document.querySelectorAll('.fact-number');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                animateNumber(number);
                numberObserver.unobserve(number);
            }
        });
    }, { threshold: 0.5 });
    
    factNumbers.forEach(num => numberObserver.observe(num));
    
    function animateNumber(element) {
        const finalNumber = parseInt(element.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 20;
        const duration = 1000;
        const stepTime = duration / 20;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                element.textContent = String(finalNumber).padStart(2, '0');
                clearInterval(timer);
            } else {
                element.textContent = String(Math.floor(currentNumber)).padStart(2, '0');
            }
        }, stepTime);
    }
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🤠 RDR2 Encyclopedia', 'font-size: 24px; font-weight: bold; color: #c9a227;');
    console.log('%cДобро пожаловать в энциклопедию Red Dead Redemption 2!', 'font-size: 14px; color: #f5f5f5;');
    
    // ===================================
    // Filter Functionality for Characters, Weapons, Gallery, Facts
    // ===================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            const parentSection = this.closest('.section') || this.closest('section');
            
            // Update active button
            const siblingButtons = parentSection.querySelectorAll('.filter-btn');
            siblingButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items based on category
            let itemsToFilter;
            
            if (parentSection.querySelector('.characters-grid')) {
                itemsToFilter = parentSection.querySelectorAll('.character-card');
            } else if (parentSection.querySelector('.weapons-grid-full')) {
                itemsToFilter = parentSection.querySelectorAll('.weapon-card');
            } else if (parentSection.querySelector('.gallery-grid-full')) {
                itemsToFilter = parentSection.querySelectorAll('.gallery-item');
            } else {
                return;
            }
            
            itemsToFilter.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===================================
    // Lightbox for Gallery
    // ===================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryItemsFull = document.querySelectorAll('.gallery-grid-full .gallery-item');
    
    let currentGalleryIndex = 0;
    let visibleGalleryItems = [];
    
    if (lightbox && galleryItemsFull.length > 0) {
        // Collect visible gallery items
        function updateVisibleItems() {
            visibleGalleryItems = Array.from(galleryItemsFull).filter(item => {
                return item.style.display !== 'none';
            });
        }
        
        // Open lightbox
        galleryItemsFull.forEach((item, index) => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                updateVisibleItems();
                currentGalleryIndex = visibleGalleryItems.indexOf(item);
                openLightbox(item);
            });
        });
        
        function openLightbox(item) {
            const galleryImage = item.querySelector('.gallery-image');
            const caption = item.querySelector('.gallery-caption');
            const backgroundStyle = galleryImage.style.background;
            const textContent = galleryImage.querySelector('span').textContent;
            
            lightboxImage.style.background = backgroundStyle;
            lightboxImage.innerHTML = `<span style="font-size: 2rem;">${textContent}</span>`;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        function showPrevImage() {
            if (visibleGalleryItems.length === 0) return;
            currentGalleryIndex = (currentGalleryIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
            openLightbox(visibleGalleryItems[currentGalleryIndex]);
        }
        
        function showNextImage() {
            if (visibleGalleryItems.length === 0) return;
            currentGalleryIndex = (currentGalleryIndex + 1) % visibleGalleryItems.length;
            openLightbox(visibleGalleryItems[currentGalleryIndex]);
        }
        
        // Close button
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        // Navigation buttons
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrevImage();
            });
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                showNextImage();
            });
        }
        
        // Close on click outside
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        });
    }

});
