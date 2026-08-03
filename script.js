document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Menu Toggle ──────────────────────────────────────────
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuIcon && navLinks) {
        mobileMenuIcon.addEventListener('click', () => navLinks.classList.toggle('active'));
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // ── Scroll fade-in animation ────────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Only animate main product cards — NOT sub-cards inside ksafe container
    document.querySelectorAll(
        '.section-title, .about-text, .about-image, .stat-card, .contact-item, .contact-form, #products > .container > .product-grid > .product-card'
    ).forEach(el => {
        el.classList.add('fade-init');
        observer.observe(el);
    });

    // ── Product Modal ───────────────────────────────────────────────
    const modal           = document.getElementById('productModal');
    const modalImage      = document.getElementById('modalImage');
    const modalTitle      = document.getElementById('modalTitle');
    const modalDescription= document.getElementById('modalDescription');
    const closeBtn        = document.querySelector('.close-modal');

    function openModal(card) {
        modalTitle.textContent      = card.getAttribute('data-title');
        modalDescription.innerHTML  = card.getAttribute('data-description');
        modalImage.setAttribute('src', card.querySelector('img').getAttribute('src'));
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Attach modal to all non-category cards
    function attachModalToCards(cards) {
        cards.forEach(card => {
            if (!card.classList.contains('category-card')) {
                card.addEventListener('click', () => openModal(card));
            }
        });
    }

    attachModalToCards(document.querySelectorAll('.product-card'));

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    // ── K Safe Toggle ───────────────────────────────────────────────
    const ksafeBtn       = document.getElementById('ksafe-toggle-btn');
    const ksafeContainer = document.getElementById('ksafe-products-container');
    let ksafeOpen        = false;

    if (ksafeBtn && ksafeContainer) {
        // Ensure all inner cards start visible (no fade-init on them)
        const innerCards = ksafeContainer.querySelectorAll('.product-card');
        innerCards.forEach(card => {
            card.style.opacity   = '1';
            card.style.transform = 'none';
        });

        ksafeBtn.addEventListener('click', () => {
            ksafeOpen = !ksafeOpen;

            if (ksafeOpen) {
                ksafeContainer.style.display = 'block';
                ksafeBtn.querySelector('.click-more i').className = 'fas fa-chevron-up';

                // Staggered card reveal
                innerCards.forEach((card, i) => {
                    card.style.opacity   = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition= 'opacity 0.4s ease, transform 0.4s ease';
                    setTimeout(() => {
                        card.style.opacity   = '1';
                        card.style.transform = 'translateY(0)';
                    }, 60 + i * 80);
                });

                setTimeout(() => ksafeContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
            } else {
                ksafeContainer.style.display = 'none';
                ksafeBtn.querySelector('.click-more i').className = 'fas fa-chevron-down';
            }
        });
    }
});
