// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true
});

// 导航栏相关功能
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    // 处理滚动事件 - 只添加/移除滚动样式，不隐藏导航栏
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // 添加/移除滚动样式
        if (currentScroll > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // 使用 requestAnimationFrame 优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 处理移动端菜单
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.createElement('div');
    backdrop.className = 'backdrop';
    document.body.appendChild(backdrop);
    
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        backdrop.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // 调试日志
        console.log('Menu toggled:', isMenuOpen);
        console.log('Hamburger classes:', hamburger.classList);
        console.log('Nav Links classes:', navLinks.classList);
    }

    // 汉堡菜单点击事件
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // 点击背景遮罩关闭菜单
    backdrop.addEventListener('click', () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    });

    // 点击导航链接关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // 阻止菜单内部点击事件冒泡
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 监听滚动事件，添加导航栏背景
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu();
        }
    });

    // 添加页面滚动锁定
    function lockScroll(lock) {
        document.body.style.overflow = lock ? 'hidden' : '';
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 表单验证
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

// 添加滚动进度条
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// 添加渐入动画
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => observer.observe(element));

// 移除原有的鼠标移动视差效果，替换为新的交互效果
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card, .advantage-card, .product-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 添加交错动画
const staggerContainers = document.querySelectorAll('.stagger-animation');
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let delay = 0;
            entry.target.querySelectorAll('*').forEach(element => {
                element.style.transitionDelay = `${delay}ms`;
                element.classList.add('visible');
                delay += 100;
            });
        }
    });
}, {
    threshold: 0.2
});

staggerContainers.forEach(container => staggerObserver.observe(container));

// 添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 更新HTML元素以支持新动画
document.addEventListener('DOMContentLoaded', () => {
    // 添加滚动指示器
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
        heroSection.appendChild(scrollIndicator);
    }

    // 为网格容器添加交错动画类
    const grids = document.querySelectorAll('.features-grid, .advantages-grid, .products-grid');
    grids.forEach(grid => grid.classList.add('stagger-animation'));
});

// 优化滚动进度条动画
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = window.scrollY / windowHeight;
        document.querySelector('.scroll-progress').style.transform = `scaleX(${progress})`;
    });
});

// FAQ交互功能
document.addEventListener('DOMContentLoaded', function() {
    // FAQ交互
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // 关闭其他打开的FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前项的状态
            item.classList.toggle('active');
        });
    });
});