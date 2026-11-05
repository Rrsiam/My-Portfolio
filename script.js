document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================
       1. DARK MODE TOGGLE
       ========================================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    /* =========================================================
       2. MOBILE MENU TOGGLE
       ========================================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    /* =========================================================
       3. FEATURED PROJECTS CAROUSEL
       ========================================================= */
    (function initProjectCarousel() {
        const wrapper = document.getElementById('project-carousel');
        const viewport = wrapper ? wrapper.querySelector('.carousel-viewport') : null;
        const track = document.getElementById('project-track');
        const prevBtn = document.getElementById('proj-prev');
        const nextBtn = document.getElementById('proj-next');
        const dotsWrapper = document.getElementById('project-dots');

        if (!wrapper || !viewport || !track || !dotsWrapper) return;

        const items = Array.from(track.children);
        if (items.length === 0) return;

        const AUTOPLAY_DELAY = 4000;
        let index = 0;
        let autoplayTimer = null;
        let dots = [];

        function getPerView() {
            return window.matchMedia('(max-width: 768px)').matches ? 1 : 2;
        }

        function getStep() {
            if (items.length < 2) return items[0].getBoundingClientRect().width;
            const first = items[0].getBoundingClientRect();
            const second = items[1].getBoundingClientRect();
            return second.left - first.left;
        }

        function getMaxIndex() {
            return Math.max(0, items.length - getPerView());
        }

        function applyTransform() {
            const step = getStep();
            track.style.transform = `translateX(${-index * step}px)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function goTo(target) {
            const maxIndex = getMaxIndex();

            if (target > maxIndex) {
                index = 0;
            } else if (target < 0) {
                index = maxIndex;
            } else {
                index = target;
            }
            applyTransform();
        }

        function buildDots() {
            const maxIndex = getMaxIndex();
            dotsWrapper.innerHTML = '';
            dots = [];

            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === index ? ' active' : '');
                dot.setAttribute('type', 'button');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goTo(i);
                    restartAutoplay();
                });
                dotsWrapper.appendChild(dot);
                dots.push(dot);
            }
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(() => goTo(index + 1), AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function restartAutoplay() {
            startAutoplay();
        }

        wrapper.addEventListener('mouseenter', stopAutoplay);
        wrapper.addEventListener('mouseleave', startAutoplay);
        wrapper.addEventListener('focusin', stopAutoplay);
        wrapper.addEventListener('focusout', startAutoplay);

        document.addEventListener('visibilitychange', () => {
            document.hidden ? stopAutoplay() : startAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            goTo(index - 1);
            restartAutoplay();
        });

        nextBtn.addEventListener('click', () => {
            goTo(index + 1);
            restartAutoplay();
        });

        wrapper.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { goTo(index - 1); restartAutoplay(); }
            if (e.key === 'ArrowRight') { goTo(index + 1); restartAutoplay(); }
        });

        let touchStartX = 0;
        let touchDeltaX = 0;

        viewport.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchDeltaX = 0;
            stopAutoplay();
        }, { passive: true });

        viewport.addEventListener('touchmove', (e) => {
            touchDeltaX = e.touches[0].clientX - touchStartX;
        }, { passive: true });

        viewport.addEventListener('touchend', () => {
            if (Math.abs(touchDeltaX) > 50) {
                touchDeltaX < 0 ? goTo(index + 1) : goTo(index - 1);
            }
            touchDeltaX = 0;
            startAutoplay();
        });

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const maxIndex = getMaxIndex();
                if (index > maxIndex) index = maxIndex;
                buildDots();
                applyTransform();
            }, 150);
        });

        buildDots();
        applyTransform();
        startAutoplay();
    })();

    /* =========================================================
       4. CERTIFICATION TABS FILTER
       ========================================================= */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const certCards = document.querySelectorAll('.cert-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            certCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* =========================================================
       5. SCROLL ANIMATIONS
       ========================================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    /* =========================================================
       6. PROOF MODAL — CAROUSEL (1 image per slide)
       ========================================================= */
    const proofState = {
        index: 0,
        total: 0,
        touchStartX: 0,
        touchDeltaX: 0
    };

    const proofTrack = document.getElementById('proof-track');
    const proofDots = document.getElementById('proof-dots');
    const proofCounter = document.getElementById('proof-counter');
    const proofPrevBtn = document.getElementById('proof-prev');
    const proofNextBtn = document.getElementById('proof-next');
    const proofViewport = document.querySelector('.proof-viewport');

    function goToProof(target) {
        const { total } = proofState;
        if (total === 0) return;

        // wrap-around
        if (target < 0) target = total - 1;
        if (target >= total) target = 0;

        proofState.index = target;
        proofTrack.style.transform = `translateX(${-target * 100}%)`;

        Array.from(proofDots.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === target);
        });

        proofCounter.textContent = `${target + 1} / ${total}`;
    }

    function buildProofCarousel(imagePaths, title) {
        proofTrack.innerHTML = '';
        proofDots.innerHTML = '';
        proofState.index = 0;
        proofState.total = imagePaths.length;

        imagePaths.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'proof-slide';

            const img = document.createElement('img');
            img.src = src;
            img.alt = `${title} — screenshot ${i + 1}`;
            img.loading = 'lazy';
            img.onerror = function () {
                this.style.opacity = '0.35';
                this.alt = 'Image unavailable';
            };

            slide.appendChild(img);
            proofTrack.appendChild(slide);
        });

        // Dots
        if (proofState.total > 1) {
            for (let i = 0; i < proofState.total; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'proof-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Go to proof ${i + 1}`);
                dot.addEventListener('click', () => goToProof(i));
                proofDots.appendChild(dot);
            }
        }

        // Hide nav/controls if only one image
        const single = proofState.total <= 1;
        proofPrevBtn.style.display = single ? 'none' : '';
        proofNextBtn.style.display = single ? 'none' : '';
        proofDots.style.display = single ? 'none' : '';

        // Reset transform & counter
        proofTrack.style.transform = 'translateX(0%)';
        proofCounter.textContent = `1 / ${proofState.total}`;
    }

    // Prev / Next buttons
    proofPrevBtn.addEventListener('click', () => goToProof(proofState.index - 1));
    proofNextBtn.addEventListener('click', () => goToProof(proofState.index + 1));

    // Touch swipe on viewport
    proofViewport.addEventListener('touchstart', (e) => {
        proofState.touchStartX = e.touches[0].clientX;
        proofState.touchDeltaX = 0;
    }, { passive: true });

    proofViewport.addEventListener('touchmove', (e) => {
        proofState.touchDeltaX = e.touches[0].clientX - proofState.touchStartX;
    }, { passive: true });

    proofViewport.addEventListener('touchend', () => {
        if (Math.abs(proofState.touchDeltaX) > 50) {
            if (proofState.touchDeltaX < 0) goToProof(proofState.index + 1);
            else goToProof(proofState.index - 1);
        }
        proofState.touchDeltaX = 0;
    });

    // Public functions
    window.openGallery = function (title, imagePaths) {
        const modal = document.getElementById('proofModal');
        const modalTitle = document.getElementById('modalTitle');

        modalTitle.textContent = title;
        buildProofCarousel(imagePaths, title);

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeGallery = function () {
        const modal = document.getElementById('proofModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    // Click outside to close
    window.addEventListener('click', function (event) {
        const modal = document.getElementById('proofModal');
        if (event.target === modal) {
            window.closeGallery();
        }
    });

    // Keyboard: Escape / ← / →
    document.addEventListener('keydown', function (event) {
        const modal = document.getElementById('proofModal');
        if (!modal.classList.contains('show')) return;

        if (event.key === 'Escape') {
            window.closeGallery();
        } else if (event.key === 'ArrowLeft') {
            goToProof(proofState.index - 1);
        } else if (event.key === 'ArrowRight') {
            goToProof(proofState.index + 1);
        }
    });
});