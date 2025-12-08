document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    let lastScrollTop = 0;
    const navbarHeight = navbar.offsetHeight;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        if (scrollTop > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }

        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            
            navbar.style.transform = 'translateY(-100%)';
        } else {
            
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;

        // WhatsApp button animation on scroll
        if (scrollTop > 300) {
            whatsappBtn.style.opacity = '1';
            whatsappBtn.style.transform = 'translateY(0)';
        }
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse) { // Check if element exists to avoid errors
        const bsCollapse = new bootstrap.Collapse(navCollapse, {toggle: false});
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                 if (navCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple reveal animation for services
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // About Us section scroll animations
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    const servicesList = document.querySelector('.services-list-section');
    
    if (aboutText) aboutObserver.observe(aboutText);
    if (aboutImage) aboutObserver.observe(aboutImage);
    if (servicesList) aboutObserver.observe(servicesList);
});