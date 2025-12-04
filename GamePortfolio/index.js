// 移动端导航菜单切换
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// 滚动时导航栏阴影效果
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// 筛选功能
const filterButtons = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.game-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 移除所有active类
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // 添加active类到当前按钮
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        gameCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Modal 功能
const modal = document.getElementById('gameModal');
const modalClose = document.querySelector('.modal-close');

// 点击游戏卡片打开modal
gameCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // 防止点击链接时打开modal
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
        
        // 填充modal内容
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = description + ' ' + description; // 扩展描述
        document.getElementById('modalYear').textContent = year;
        document.getElementById('modalGenre').textContent = genre;
        document.getElementById('modalEngine').textContent = badge;
        document.querySelector('.modal-image').src = image;
        
        // 填充技术标签
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

// 关闭modal
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

// ESC键关闭modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// 页面加载动画
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

// 返回顶部按钮
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

// 悬停效果增强
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
