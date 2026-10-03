/* ==========================================================================
   PORTFOLIO INTERACTIVE SCRIPT (VANILLA JS)
   ========================================================================== */

// 1. Easy CV Configuration Variable
const CV_PATH = "assets/cv.pdf";

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initTypingEffect();
    initThemeToggle();
    initMobileNav();
    initScrollEffects();
    initTiltEffects();
    initRippleEffects();
    initCertificateModal();
    initCvModal();
    initFormValidation();
});

/* Preloader */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 300);
    });
}

/* Custom Cursor */
function initCustomCursor() {
    const dot = document.querySelector('[data-cursor-dot]');
    const outline = document.querySelector('[data-cursor-outline]');
    
    if (!dot || !outline) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
}

/* Dynamic Typing Animation */
function initTypingEffect() {
    const typedTextElement = document.getElementById('typed-text');
    const phrases = [
        "Programming Student",
        "Front-End Developer",
        "Data Analysis Enthusiast",
        "UI/UX Advocate"
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && letterIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* Light / Dark Mode Toggle with localStorage */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = toggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'light') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }
}

/* Mobile Navigation */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

/* Scroll Behavior, Navbar Styling & Active Link Indicator */
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Navbar styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll To Top Visibility
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Active Section Tracker
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* 3D Tilt Effect on Desktop */
function initTiltEffects() {
    const tiltCards = document.querySelectorAll('.tilt-card, .profile-card-3d');

    if (window.innerWidth < 1024) return;

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

/* Button Ripple Animations */
function initRippleEffects() {
    const rippleButtons = document.querySelectorAll('.ripple');

    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/* Certificate View Modal */
function initCertificateModal() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalTitle = document.getElementById('certModalTitle');
    const closeBtn = document.getElementById('certModalClose');
    const openBtns = document.querySelectorAll('.open-cert-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certSrc = btn.getAttribute('data-cert');
            const certTitle = btn.getAttribute('data-title');

            modalImg.src = certSrc;
            modalTitle.textContent = certTitle;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

/* CV Fullscreen Viewer Modal & Verification */
function initCvModal() {
    const cvModal = document.getElementById('cvModal');
    const viewCvBtn = document.getElementById('viewCvBtn');
    const closeCvBtn = document.getElementById('cvModalClose');
    const iframeContainer = document.getElementById('cvIframeContainer');
    const printBtn = document.getElementById('printCvBtn');
    const fullscreenBtn = document.getElementById('fullscreenCvBtn');

    viewCvBtn.addEventListener('click', () => {
        // Verify PDF Existence before embedding iframe
        fetch(CV_PATH, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    iframeContainer.innerHTML = `<iframe src="${CV_PATH}" title="Mohamed Alaa CV"></iframe>`;
                } else {
                    showCvError();
                }
            })
            .catch(() => {
                showCvError();
            });

        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function showCvError() {
        iframeContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #ef4444; margin-bottom: 15px;"></i>
                <h3>CV is currently unavailable</h3>
                <p style="margin-top: 10px;">Please ensure the PDF file exists at: <code>${CV_PATH}</code></p>
            </div>
        `;
    }

    function closeCvModal() {
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
        iframeContainer.innerHTML = ''; // Clean memory
    }

    closeCvBtn.addEventListener('click', closeCvModal);
    
    cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) closeCvModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.classList.contains('active')) {
            closeCvModal();
        }
    });

    // Optional Print CV
    printBtn.addEventListener('click', () => {
        const printWindow = window.open(CV_PATH, '_blank');
        if (printWindow) {
            printWindow.focus();
            printWindow.print();
        }
    });

    // Fullscreen Toggle
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            cvModal.requestFullscreen().catch(err => alert(`Error trying to enable fullscreen: ${err.message}`));
        } else {
            document.exitFullscreen();
        }
    });
}

/* Front-End Contact Form Validation */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const statusDiv = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        clearErrors();

        // Name Validation
        if (nameInput.value.trim() === '') {
            showError('nameError', 'Name is required.');
            isValid = false;
        }

        // Email Validation
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailInput.value.match(emailPattern)) {
            showError('emailError', 'Enter a valid email address.');
            isValid = false;
        }

        // Subject Validation
        if (subjectInput.value.trim() === '') {
            showError('subjectError', 'Subject is required.');
            isValid = false;
        }

        // Message Validation
        if (messageInput.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters.');
            isValid = false;
        }

        if (isValid) {
            statusDiv.style.color = '#10b981';
            statusDiv.textContent = 'Message sent successfully! (Front-end validation passed)';
            form.reset();
            setTimeout(() => { statusDiv.textContent = ''; }, 5000);
        }
    });

    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        statusDiv.textContent = '';
    }
}