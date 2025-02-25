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
            // 检测是否为移动设备
            const isMobile = window.innerWidth < 768;
            
            AOS.init({
                // Global settings
                disable: false,
                startEvent: 'DOMContentLoaded',
                offset: 100,
                delay: 0,
                duration: 1000,
                easing: 'ease-out-cubic',
                once: false,
                mirror: true,
                anchorPlacement: 'top-center',

                // 禁用这些可能导致冲突的选项
                useClassNames: false,
                disableMutationObserver: false,
            });

            // 添加滚动监听
            window.addEventListener('scroll', () => {
                requestAnimationFrame(() => {
                    AOS.refresh();
                });
            });
        },

        /**
         * 导航栏功能初始化
         * 处理导航菜单、汉堡按钮等交互
         */
        navbar: () => {
            const navbar = document.querySelector('.navbar');
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            // Create backdrop element if it doesn't exist
            let backdrop = document.querySelector('.backdrop');
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'backdrop';
                document.body.appendChild(backdrop);
            }
            
            let isMenuOpen = false;
            let scrollPosition = 0;

            const toggleMenu = () => {
                isMenuOpen = !isMenuOpen;
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
                backdrop.classList.toggle('active');
                
                if (isMenuOpen) {
                    // Save current scroll position and prevent scrolling
                    scrollPosition = window.pageYOffset;
                    document.body.classList.add('menu-open');
                    document.body.style.top = `-${scrollPosition}px`;
                } else {
                    // Restore scroll position
                    document.body.classList.remove('menu-open');
                    document.body.style.top = '';
                    window.scrollTo(0, scrollPosition);
                }
            };

            // Add event listeners if elements exist
            if (hamburger) {
                hamburger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleMenu();
                });
            }

            if (backdrop) {
                backdrop.addEventListener('click', () => {
                    if (isMenuOpen) toggleMenu();
                });
            }

            // Close menu on window resize if screen is large
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && isMenuOpen) {
                    isMenuOpen = false;
                    hamburger?.classList.remove('active');
                    navLinks?.classList.remove('active');
                    backdrop?.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.body.style.top = '';
                    window.scrollTo(0, scrollPosition);
                }
            });
        },

        initSwipers: () => {
            // Hero轮播图
            const heroSwiper = new Swiper('.hero-swiper', {
                // 基础配置
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                speed: 1000,
                grabCursor: true,
                
                // 自动播放
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },

                // 淡入淡出效果
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },

                // 分页器
                pagination: {
                    el: '.hero-swiper .swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },

                // 导航按钮
                navigation: {
                    nextEl: '.hero-swiper .swiper-button-next',
                    prevEl: '.hero-swiper .swiper-button-prev',
                },

                // 键盘控制
                keyboard: {
                    enabled: true,
                    onlyInViewport: true
                },

                // 可访问性
                a11y: {
                    prevSlideMessage: '上一张图片',
                    nextSlideMessage: '下一张图片',
                    firstSlideMessage: '这是第一张图片',
                    lastSlideMessage: '这是最后一张图片',
                    paginationBulletMessage: '跳转到第{{index}}张图片'
                },

                // 监听事件
                on: {
                    init: function() {
                        // 删除: console.log('Hero Swiper initialized');
                    },
                    slideChange: function() {
                        // 删除: console.log('Slide changed');
                    }
                }
            });

            // 错误处理
            if (!heroSwiper) {
                console.error('Hero Swiper initialization failed');
            }

            // 监听窗口大小变化
            window.addEventListener('resize', () => {
                if (heroSwiper) {
                    heroSwiper.update();
                }
            });

            // 视频轮播
            const feedbackSwiper = new Swiper('.feedback-swiper', {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 30,
                loop: true,
                speed: 800,
                effect: 'coverflow',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            });

            // 初始化视频播放功能
            const videoCards = document.querySelectorAll('.video-card');
            const videoModal = document.querySelector('.video-modal');
            const videoContainer = videoModal?.querySelector('.video-container');
            const modalClose = videoModal?.querySelector('.modal-close');

            videoCards.forEach(card => {
                card.addEventListener('click', () => {
                    const videoId = card.dataset.videoId;
                    if (videoModal && videoContainer && videoId) {
                        videoContainer.innerHTML = `
                            <iframe 
                                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        `;
                        videoModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });

            // 关闭按钮点击事件
            modalClose?.addEventListener('click', () => {
                closeVideoModal();
            });

            // 点击背景关闭
            videoModal?.addEventListener('click', (e) => {
                if (e.target === videoModal) {
                    closeVideoModal();
                }
            });

            // ESC键关闭
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
                    closeVideoModal();
                }
            });

            // 关闭视频模态框函数
            function closeVideoModal() {
                if (videoModal && videoContainer) {
                    videoModal.classList.remove('active');
                    document.body.style.overflow = '';
                    // 确保视频停止播放
                    setTimeout(() => {
                        videoContainer.innerHTML = '';
                    }, 300);
                }
            }

            return {
                heroSwiper
            };
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
                const icon = question.querySelector('i');
                
                question.addEventListener('click', () => {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherIcon = otherItem.querySelector('.faq-question i');
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    item.classList.toggle('active');
                    icon.style.transform = item.classList.contains('active') ? 'rotate(45deg)' : 'rotate(0deg)';
                });
            });
        },

        imageViewer: () => {
            const imageViewer = document.querySelector('.image-viewer');
            const viewerImage = imageViewer?.querySelector('img');
            const closeBtn = imageViewer?.querySelector('.close-btn');
            const prevBtn = imageViewer?.querySelector('.prev-btn');
            const nextBtn = imageViewer?.querySelector('.next-btn');
            const hamburger = document.querySelector('.hamburger');

            // 只收集Hero Section的图片
            const heroImages = document.querySelectorAll('.hero-swiper .swiper-slide img');
            const imageUrls = Array.from(heroImages).map(img => img.src);
            let currentIndex = 0;

            // 更新导航按钮状态
            const updateNavButtons = () => {
                if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
                if (nextBtn) nextBtn.style.opacity = currentIndex === imageUrls.length - 1 ? '0.5' : '1';
            };

            // 显示图片
            const showImage = (index) => {
                if (viewerImage && index >= 0 && index < imageUrls.length) {
                    currentIndex = index;
                    viewerImage.src = imageUrls[index];
                    updateNavButtons();
                }
            };

            // 关闭查看器
            const closeViewer = () => {
                imageViewer?.classList.remove('active');
                document.body.style.overflow = '';
                
                // Show hamburger menu again when viewer is closed
                if (hamburger && window.innerWidth <= 768) {
                    hamburger.style.display = '';
                }
            };

            // 只为Hero Section的图片添加点击事件
            heroImages.forEach((img, index) => {
                img.style.cursor = 'zoom-in';
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (imageViewer && viewerImage) {
                        currentIndex = index;
                        showImage(currentIndex);
                        imageViewer.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        
                        // Hide hamburger menu when viewer is open on mobile
                        if (hamburger && window.innerWidth <= 768) {
                            hamburger.style.display = 'none';
                        }
                    }
                });
            });

            // 添加关闭事件
            closeBtn?.addEventListener('click', closeViewer);
            imageViewer?.addEventListener('click', (e) => {
                if (e.target === imageViewer) closeViewer();
            });

            // Also handle hamburger visibility when Escape key is pressed
            document.addEventListener('keydown', (e) => {
                if (!imageViewer?.classList.contains('active')) return;

                if (e.key === 'Escape') {
                    closeViewer();
                }
            });

            // Handle window resize to manage hamburger visibility
            window.addEventListener('resize', () => {
                if (imageViewer?.classList.contains('active') && hamburger) {
                    hamburger.style.display = window.innerWidth <= 768 ? 'none' : '';
                }
            });
        }
    };

    // 执行所有初始化函数
    Object.values(init).forEach(initFn => initFn());

    // 轮播图触摸滑动
    function initCarouselTouch() {
        const carousel = document.querySelector('.carousel-track');
        if (!carousel) return;

        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let isDragging = false;
        let currentIndex = 0;
        const slides = Array.from(carousel.children);

        function getSlideWidth() {
            return carousel.clientWidth;
        }

        function setPositionByIndex() {
            currentTranslate = currentIndex * -getSlideWidth();
            prevTranslate = currentTranslate;
            carousel.style.transition = 'transform 0.3s ease-out';
            carousel.style.transform = `translateX(${currentTranslate}px)`;
        }

        function handleTouchStart(e) {
            console.log('Touch Start'); // 调试日志
            startX = e.touches[0].clientX;
            isDragging = true;
            
            const transform = window.getComputedStyle(carousel).transform;
            prevTranslate = transform !== 'none' 
                ? parseInt(transform.split(',')[4]) 
                : 0;
            
            carousel.style.transition = 'none';
        }

        function handleTouchMove(e) {
            if (!isDragging) return;
            console.log('Touch Move'); // 调试日志
            
            const currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            
            currentTranslate = prevTranslate + diff;
            requestAnimationFrame(() => {
                carousel.style.transform = `translateX(${currentTranslate}px)`;
            });
        }

        function handleTouchEnd() {
            if (!isDragging) return;
            console.log('Touch End'); // 调试日志
            
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;
            
            if (Math.abs(movedBy) > getSlideWidth() * 0.2) {
                if (movedBy < 0 && currentIndex < slides.length - 1) {
                    currentIndex++;
                } else if (movedBy > 0 && currentIndex > 0) {
                    currentIndex--;
                }
            }
            
            setPositionByIndex();
        }

        // 移除所有现有的事件监听器
        carousel.removeEventListener('touchstart', handleTouchStart);
        carousel.removeEventListener('touchmove', handleTouchMove);
        carousel.removeEventListener('touchend', handleTouchEnd);

        // 添加新的事件监听器
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
        carousel.addEventListener('touchend', handleTouchEnd);

        // 初始化位置
        setPositionByIndex();
    }

    // 初始化轮播图
    const swipers = init.initSwipers();
    
    // 初始化触摸事件
    initCarouselTouch();

    // 添加滚动指示器
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && !heroSection.querySelector('.scroll-indicator')) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
        heroSection.appendChild(scrollIndicator);
    }

    // 为网格容器添加交错动画类
    const grids = document.querySelectorAll('.features-grid, .advantages-grid, .products-grid');
    grids.forEach(grid => {
        if (!grid.classList.contains('stagger-animation')) {
            grid.classList.add('stagger-animation');
        }
    });

    // 添加触摸事件调试
    const debugTouch = (e) => {
        // 删除整个console.log内容
    };

    // 监听整个文档的触摸事件
    document.addEventListener('touchstart', debugTouch, { passive: true });
    document.addEventListener('touchmove', debugTouch, { passive: true });
    document.addEventListener('touchend', debugTouch);

    // 检查优势卡片
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        card.addEventListener('animationstart', () => {});
        card.addEventListener('animationend', () => {});
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

// 移除可能与AOS冲突的动画代码
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

// 优化滚动处理
const handleScroll = debounce(() => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = window.scrollY / windowHeight;
        scrollProgress.style.transform = `scaleX(${progress})`;
    }
}, 16);

// 首先定义debounce函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用passive事件监听器优化性能
window.addEventListener('scroll', handleScroll, { passive: true });

// 平滑滚动优化
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

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('Global error:', e.message);
});

// 添加资源加载错误处理
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'path/to/fallback-image.jpg';
    });
});

// 在文件末尾添加调试代码
document.addEventListener('DOMContentLoaded', () => {
    // 添加触摸事件调试
    const debugTouch = (e) => {
        // 删除整个console.log内容
    };

    // 监听整个文档的触摸事件
    document.addEventListener('touchstart', debugTouch, { passive: true });
    document.addEventListener('touchmove', debugTouch, { passive: true });
    document.addEventListener('touchend', debugTouch);

    // 检查优势卡片是否正确初始化
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        card.addEventListener('animationstart', () => {
            // 删除: console.log('Animation started for card:', card);
        });
        card.addEventListener('animationend', () => {
            // 删除: console.log('Animation completed for card:', card);
        });
    });
});