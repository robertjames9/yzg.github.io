/**
 * 主要功能初始化模块
 * 包含所有页面交互和动画效果的初始化
 */
document.addEventListener('DOMContentLoaded', function() {
    // 功能模块集合
    const init = {
        /**
         * AOS动画初始化
         * 控制页面滚动时的动画效果
         */
        aos: () => {
            AOS.init({
                duration: 1000,    // 动画持续时间
                once: true,        // 动画只执行一次
                offset: 100        // 触发偏移量
            });
        },

        /**
         * 导航栏功能初始化
         * 处理导航菜单、汉堡按钮等交互
         */
        navbar: () => {
            // 获取DOM元素
            const navbar = document.querySelector('.navbar');
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            // 创建背景遮罩
            const backdrop = document.createElement('div');
            backdrop.className = 'backdrop';
            document.body.appendChild(backdrop);
            
            let isMenuOpen = false;

            // 合并菜单相关事件处理
            const toggleMenu = () => {
                isMenuOpen = !isMenuOpen;
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
                backdrop.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            };

            // 事件监听器
            const eventListeners = {
                hamburger: () => hamburger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleMenu();
                }),
                
                backdrop: () => backdrop.addEventListener('click', () => {
                    if (isMenuOpen) toggleMenu();
                }),
                
                navLinks: () => {
                    navLinks.querySelectorAll('a').forEach(link => {
                        link.addEventListener('click', () => {
                            if (isMenuOpen) toggleMenu();
                        });
                    });
                },
                
                document: () => {
                    document.addEventListener('click', (e) => {
                        if (isMenuOpen && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                            toggleMenu();
                        }
                    });
                }
            };

            // 初始化所有事件监听器
            Object.values(eventListeners).forEach(listener => listener());
        },

        scrollEffects: () => {
            // 滚动进度条
            const scrollProgress = document.createElement('div');
            scrollProgress.className = 'scroll-progress';
            document.body.appendChild(scrollProgress);

            // 优化滚动处理
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) {
                    window.cancelAnimationFrame(scrollTimeout);
                }
                scrollTimeout = window.requestAnimationFrame(() => {
                    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = window.scrollY / windowHeight;
                    scrollProgress.style.transform = `scaleX(${progress})`;
                });
            });
        },

        faq: () => {
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = question.querySelector('i');
                
                question.addEventListener('click', () => {
                    // 关闭其他打开的FAQ项
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherIcon = otherItem.querySelector('.faq-question i');
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // 切换当前项的状态
                    item.classList.toggle('active');
                    
                    // 旋转加号图标
                    icon.style.transform = item.classList.contains('active') ? 'rotate(45deg)' : 'rotate(0deg)';
                });
            });
        }
    };

    // 执行所有初始化函数
    Object.values(init).forEach(initFn => initFn());
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

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('Global error:', e.message);
});

// 优化性能
const debounce = (fn, delay) => {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
};

// 优化滚动处理
const handleScroll = debounce(() => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = window.scrollY / windowHeight;
        scrollProgress.style.transform = `scaleX(${progress})`;
    }
}, 16);

// 优化事件监听器
window.addEventListener('scroll', handleScroll, { passive: true });

// 添加资源加载错误处理
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'path/to/fallback-image.jpg';
    });
});