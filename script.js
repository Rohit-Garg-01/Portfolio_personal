/* ============================================
   PORTFOLIO — JavaScript (Premium Edition)
   Rohit Garg — Creative Designer Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Loader ----
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('loaded');
    }, 1200);

    // ---- Custom Cursor ----
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;

            cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
            follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Grow cursor on interactive elements
        const interactives = document.querySelectorAll('a, button, .work__item, .video__card, .photo__item');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.width = '56px';
                follower.style.height = '56px';
                follower.style.borderColor = 'rgba(200, 162, 255, 0.6)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.width = '36px';
                follower.style.height = '36px';
                follower.style.borderColor = 'rgba(200, 162, 255, 0.4)';
            });
        });
    }

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = (40 + Math.random() * 60) + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // ---- Counter Animation ----
    const counterElements = document.querySelectorAll('.hero__stat-num[data-count]');
    let counterAnimated = false;

    function animateCounters() {
        if (counterAnimated) return;
        counterAnimated = true;

        counterElements.forEach(el => {
            const target = parseInt(el.dataset.count);
            const duration = 2000;
            const start = performance.now();

            function updateCounter(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target;
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    // Trigger counters when hero is visible
    setTimeout(animateCounters, 1600);

    // ---- Navigation: Scroll Effect ----
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        // Add scrolled class
        nav.classList.toggle('nav--scrolled', window.scrollY > 50);

        // Active section highlight
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav__link[href="#${id}"]`);
            if (link) {
                link.classList.toggle('active', scrollY >= top && scrollY < bottom);
            }
        });

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 600);
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Back to Top ----
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Mobile Menu Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Scroll Reveal ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Portfolio Filters ----
    const filterButtons = document.querySelectorAll('.work__filter');
    const workItems = document.querySelectorAll('.work__item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            workItems.forEach((item, index) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 30);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ---- Video Filters ----
    const videoFilterButtons = document.querySelectorAll('.video__filter');
    const videoCards = document.querySelectorAll('.video__card');

    videoFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            videoFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.vfilter;

            videoCards.forEach((card, index) => {
                if (filter === 'all' || card.dataset.vcategory === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 40);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ---- Lightbox with Navigation ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const lightboxCounter = lightbox.querySelector('.lightbox__counter');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const lightboxPrev = lightbox.querySelector('.lightbox__prev');
    const lightboxNext = lightbox.querySelector('.lightbox__next');

    let currentLightboxItems = [];
    let currentLightboxIndex = 0;

    function openLightbox(items, index) {
        currentLightboxItems = items;
        currentLightboxIndex = index;
        showLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function showLightboxImage() {
        const item = currentLightboxItems[currentLightboxIndex];
        if (item) {
            lightboxImage.src = item.src;
            lightboxImage.alt = item.alt;
            lightboxCaption.textContent = item.caption || '';
            lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxItems.length}`;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImage.src = '';
        }, 400);
    }

    function nextLightbox() {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxItems.length;
        showLightboxImage();
    }

    function prevLightbox() {
        currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxItems.length) % currentLightboxItems.length;
        showLightboxImage();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevLightbox);
    lightboxNext.addEventListener('click', nextLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Work items lightbox
    workItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            const visibleItems = Array.from(workItems)
                .filter(wi => !wi.classList.contains('hidden'))
                .map(wi => {
                    const img = wi.querySelector('img');
                    const title = wi.querySelector('.work__item-title');
                    return {
                        src: img ? img.src : '',
                        alt: img ? img.alt : '',
                        caption: title ? title.textContent : ''
                    };
                });
            const visibleIndex = Array.from(workItems)
                .filter(wi => !wi.classList.contains('hidden'))
                .indexOf(item);
            openLightbox(visibleItems, visibleIndex);
        });
    });

    // Photography lightbox
    const photoItems = document.querySelectorAll('.photo__item');
    photoItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            const allPhotos = Array.from(photoItems).map(pi => {
                const img = pi.querySelector('img');
                return {
                    src: img ? img.src : '',
                    alt: img ? img.alt : '',
                    caption: img ? img.alt : ''
                };
            });
            openLightbox(allPhotos, i);
        });
    });

    // ---- Video Modal ----
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = videoModal.querySelector('.video-modal__player');
    const videoModalClose = videoModal.querySelector('.video-modal__close');

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const video = card.querySelector('video');
            if (video && video.src) {
                videoPlayer.src = video.src;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                videoPlayer.play();
            }
        });
    });

    const closeVideoModal = () => {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        videoPlayer.pause();
        setTimeout(() => {
            videoPlayer.src = '';
        }, 400);
    };

    videoModalClose.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
    });

    // ---- Keyboard: ESC closes modals, arrows navigate lightbox ----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeVideoModal();
        }
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') nextLightbox();
            if (e.key === 'ArrowLeft') prevLightbox();
        }
    });

    // ---- Contact Form ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('.btn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Message Sent ✓';
                btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
                btn.style.borderColor = '#22c55e';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                }, 2500);
            }, 1200);
        });
    }

    // ---- Skills: Stagger reveal + Progress bar animation ----
    const skillCards = document.querySelectorAll('.skills__card');
    const skillsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        // Animate skill bar
                        const bar = entry.target.querySelector('.skills__bar-fill');
                        if (bar) {
                            const targetWidth = bar.dataset.width || 80;
                            setTimeout(() => {
                                bar.style.width = targetWidth + '%';
                            }, 300);
                        }
                    }, index * 100);
                    skillsObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    skillCards.forEach(card => skillsObserver.observe(card));

    // ---- Smooth scroll for nav links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Tilt effect on skill cards ----
    if (window.matchMedia('(hover: hover)').matches) {
        skillCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

});
