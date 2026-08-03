document.addEventListener('DOMContentLoaded', () => {
    const kSafeProducts = [
        {
            title: 'Safety Shoes: SS2-L1',
            h3: 'Safety Shoes (SS2-L1)',
            description: 'Designed not only to enhance durability but also to exudes professionalism, SS2-L1 has a stainless steel toecap and a mid-plate that offer superior impact resistance, shielding your feet from heavy objects and potential workplace hazards.',
            image: 'SS2-L1.png',
            alt: 'SS2-L1 Safety Shoes'
        },
        {
            title: 'Safety Shoes: SS1-H1',
            h3: 'Safety Shoes (SS1-H1)',
            description: 'The ultimate fusion of durability, functionality, and style, SS1-H1 is engineered to meet the demands of modern workplaces. With the ladder grip design in the outsole offering excellent climbing support, these shoes are built to protect while keeping you steady.',
            image: 'SS1-H1.png',
            alt: 'SS1-H1 Safety Shoes'
        },
        {
            title: 'Safety Shoes: CC1-H4',
            h3: 'Safety Shoes (CC1-H4)',
            description: 'Engineered with a composite toe and anti-static non-metallic insert plates for optimal protection without added weight, CC1-H4 boasts a sporty and smart exterior design that adds a modern touch to your attire.',
            image: 'CC1-H4.png',
            alt: 'CC1-H4 Safety Shoes'
        },
        {
            title: 'Safety Shoes: SS2-L2',
            h3: 'Safety Shoes (SS2-L2)',
            description: 'Engineered to provide unparalleled protection without compromising on comfort, SS2-L2 design is the perfect companion for professionals working in hazardous environments. Designed with ergonomics in mind, these shoes feature a cushioned footbed to keep you comfortable throughout the day.',
            image: 'SS2-L2.png',
            alt: 'SS2-L2 Safety Shoes'
        },
        {
            title: 'Safety Shoes: SS1-H2',
            h3: 'Safety Shoes (SS1-H2)',
            description: 'Crafted with a sleek, contemporary design, SS1-H2 safety shoe is made from premium-grade materials to keep your feet safe and comfortable whether you’re working on a construction site, in a warehouse, or any other high-risk environment.',
            image: 'SS1-H2.png',
            alt: 'SS1-H2 Safety Shoes'
        },
        {
            title: 'Safety Shoes: CC1-H3',
            h3: 'Safety Shoes (CC1-H3)',
            description: 'This sleek non-slip design features elastic sides for added comfort and flexibility, while METAL FREE composite toecap and insert plate offers unparalleled protection against falling objects and accidental impacts, ensuring the safety of your feet in high-pressure environments.<br><br><ul style="padding-left: 20px;"><li>High cut design for extra protection around ankle</li><li>Composite toe cap and anti-static non-metallic insert plates for impact and penetration resistance</li><li>Genuine leather Upper</li><li>Elastic sides for added comfort and flexibility</li><li>PU/PU Dual density outsole</li><li>Soft mid layer for comfort and shock absorbance</li><li>Higher density outer layer for durability and safety properties</li><li>Outsole designed with special tread pattern for high drainage of liquids and slip resistance</li><li>“Ladder Grip” design in the out sole offers excellent climbing support</li><li>Removable moulded PU foam footbed with variable thickness; 3 mm in the front part and 7 mm in the heel area, for added comfort</li></ul>',
            image: 'CC1-H3.png',
            alt: 'CC1-H3 Safety Shoes'
        }
    ];

    const kSafeProductsContainer = document.getElementById('k-safe-products');

    if (kSafeProductsContainer) {
        kSafeProducts.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-title', item.title);
            card.setAttribute('data-description', item.description);
            card.innerHTML = `
                <img src="${item.image}" alt="${item.alt}">
                <div class="product-info">
                    <h3>${item.h3}</h3>
                    <p class="click-more">Click to view details <i class="fas fa-arrow-right"></i></p>
                </div>
            `;
            kSafeProductsContainer.appendChild(card);
        });
    }

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

    // Add initial styles and observe elements
    const elementsToAnimate = document.querySelectorAll('.section-title, .about-text, .about-image, .stat-card, .product-card, .contact-item, .contact-form');
    
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
    const productCards = document.querySelectorAll('.product-card');

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
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
