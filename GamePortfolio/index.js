// Mobile navigation menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Navbar shadow effect on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Get all game cards
const gameCards = document.querySelectorAll('.game-card');

// Modal functionality
const modal = document.getElementById('gameModal');
const modalClose = document.querySelector('.modal-close');

// Open modal when clicking game cards
gameCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent modal from opening when clicking links
        if (e.target.closest('a')) {
            return;
        }
        
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('.game-description').textContent;
        const meta = card.querySelector('.game-meta');
        const year = meta.querySelector('span:first-child').textContent.replace(/.*\s/, '');
        const genre = meta.querySelector('span:nth-child(2)').textContent.replace(/.*\s/, '');
        const badge = card.querySelector('.game-badge').textContent;
        const image = card.querySelector('.game-image img').src;
        
        // Fill modal content
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = description + ' ' + description;
        document.getElementById('modalYear').textContent = year;
        document.getElementById('modalGenre').textContent = genre;
        document.getElementById('modalEngine').textContent = badge;
        document.querySelector('.modal-image').src = image;
        
        // Fill technology tags
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        card.querySelectorAll('.game-tech span').forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech.textContent;
            techContainer.appendChild(span);
        });
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Page load animation
window.addEventListener('load', () => {
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 999;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
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

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
});

// Enhanced hover effects for game cards
gameCards.forEach(card => {
    const overlay = card.querySelector('.game-overlay');
    const btnIcons = overlay.querySelectorAll('.btn-icon');
    
    btnIcons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        
        card.addEventListener('mouseenter', () => {
            setTimeout(() => {
                btn.style.transition = 'all 0.3s ease';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        card.addEventListener('mouseleave', () => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
        });
    });
});

console.log('Game Portfolio loaded successfully! 🎮');
