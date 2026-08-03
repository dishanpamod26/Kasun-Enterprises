document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuIcon && navLinks) {
        mobileMenuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Simple scroll animation for elements (Fade in up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add initial styles and observe elements (exclude sub-category container)
    const elementsToAnimate = document.querySelectorAll('.section-title, .about-text, .about-image, .stat-card, .product-card:not(#ksafe-products-container .product-card), .contact-item, .contact-form');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Product Modal Logic
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close-modal');
    const productCards = document.querySelectorAll('.product-card:not(.category-card)'); // Exclude category cards from modal

    if(modal && productCards.length > 0) {
        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title');
                const description = card.getAttribute('data-description');
                const imgSrc = card.querySelector('img').getAttribute('src');

                modalTitle.textContent = title;
                modalDescription.innerHTML = description;
                modalImage.setAttribute('src', imgSrc);

                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close modal when clicking the X
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside the content
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Sub-category Toggle Logic for K Safe
    const ksafeToggleBtn = document.getElementById('ksafe-toggle-btn');
    const ksafeProductsContainer = document.getElementById('ksafe-products-container');

    if(ksafeToggleBtn && ksafeProductsContainer) {
        // Make sure inner cards are fully visible when container shows
        const innerCards = ksafeProductsContainer.querySelectorAll('.product-card');
        innerCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });

        ksafeToggleBtn.addEventListener('click', () => {
            const isHidden = ksafeProductsContainer.style.display === 'none' || ksafeProductsContainer.style.display === '';
            if (isHidden) {
                ksafeProductsContainer.style.display = 'block';
                ksafeToggleBtn.querySelector('.click-more i').className = 'fas fa-chevron-up';
                // Scroll down to show the products
                setTimeout(() => {
                    ksafeProductsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);

                // Animate inner cards in
                innerCards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 80);
                });

                // Add click events to the inner cards for modal
                if (modal) {
                    innerCards.forEach(card => {
                        card.onclick = () => {
                            const title = card.getAttribute('data-title');
                            const description = card.getAttribute('data-description');
                            const imgSrc = card.querySelector('img').getAttribute('src');
                            modalTitle.textContent = title;
                            modalDescription.innerHTML = description;
                            modalImage.setAttribute('src', imgSrc);
                            modal.classList.add('show');
                            document.body.style.overflow = 'hidden';
                        };
                    });
                }
            } else {
                ksafeProductsContainer.style.display = 'none';
                ksafeToggleBtn.querySelector('.click-more i').className = 'fas fa-chevron-down';
            }
        });
    }
});
