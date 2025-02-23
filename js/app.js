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
        },

        carousel: () => {
            const track = document.querySelector('.carousel-track');
            const slides = document.querySelectorAll('.carousel-slide');
            const indicators = document.querySelectorAll('.indicator');
            const prevButton = document.querySelector('.carousel-button.prev');
            const nextButton = document.querySelector('.carousel-button.next');
            
            let currentIndex = 0;
            let autoplayInterval;
            
            // 更新轮播图位置
            const updateCarousel = (index) => {
                track.style.transform = `translateX(-${index * 100}%)`;
                indicators.forEach(ind => ind.classList.remove('active'));
                indicators[index].classList.add('active');
                currentIndex = index;
            };
            
            // 自动播放
            const startAutoplay = () => {
                autoplayInterval = setInterval(() => {
                    const nextIndex = (currentIndex + 1) % slides.length;
                    updateCarousel(nextIndex);
                }, 5000);
            };
            
            // 停止自动播放
            const stopAutoplay = () => {
                clearInterval(autoplayInterval);
            };
            
            // 事件监听
            prevButton.addEventListener('click', () => {
                stopAutoplay();
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel(prevIndex);
                startAutoplay();
            });
            
            nextButton.addEventListener('click', () => {
                stopAutoplay();
                const nextIndex = (currentIndex + 1) % slides.length;
                updateCarousel(nextIndex);
                startAutoplay();
            });
            
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    stopAutoplay();
                    updateCarousel(index);
                    startAutoplay();
                });
            });
            
            // 图片查看器功能
            const viewer = document.querySelector('.image-viewer');
            const viewerImg = viewer.querySelector('img');
            const viewerClose = viewer.querySelector('.viewer-close');
            const viewerPrev = viewer.querySelector('.viewer-nav.prev');
            const viewerNext = viewer.querySelector('.viewer-nav.next');
            
            // 修改图片切换函数
            const switchImage = (newSrc, direction = 'next') => {
                // 添加淡出效果
                viewerImg.classList.add('fade-out');
                
                setTimeout(() => {
                    // 添加淡入效果的初始状态
                    viewerImg.classList.remove('fade-out');
                    viewerImg.classList.add('fade-in');
                    
                    // 更改图片源
                    viewerImg.src = newSrc;
                    
                    // 图片加载完成后执行淡入动画
                    viewerImg.onload = () => {
                        requestAnimationFrame(() => {
                            viewerImg.classList.remove('fade-in');
                        });
                    };
                }, 300);
            };

            // 打开图片查看器
            slides.forEach(slide => {
                slide.addEventListener('click', (e) => {
                    e.preventDefault();
                    const img = slide.querySelector('img');
                    viewerImg.src = img.src;
                    viewer.classList.add('active');
                    currentIndex = parseInt(slide.dataset.index);
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // 关闭图片查看器
            const closeViewer = () => {
                viewer.classList.remove('active');
                // 恢复背景滚动
                document.body.style.overflow = '';
            };

            viewerClose.addEventListener('click', closeViewer);
            
            // 点击背景关闭查看器
            viewer.addEventListener('click', (e) => {
                if (e.target === viewer) {
                    closeViewer();
                }
            });
            
            // 修改导航按钮的点击事件
            viewerPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                const prevImg = slides[currentIndex].querySelector('img');
                switchImage(prevImg.src, 'prev');
            });
            
            viewerNext.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % slides.length;
                const nextImg = slides[currentIndex].querySelector('img');
                switchImage(nextImg.src, 'next');
            });
            
            // 键盘导航
            document.addEventListener('keydown', (e) => {
                if (!viewer.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape':
                        closeViewer();
                        break;
                    case 'ArrowLeft':
                        viewerPrev.click();
                        break;
                    case 'ArrowRight':
                        viewerNext.click();
                        break;
                }
            });

            // 阻止图片拖动
            viewerImg.addEventListener('dragstart', (e) => e.preventDefault());
            
            // 启动自动播放
            startAutoplay();
        },

        videoCarousel: () => {
            const wrapper = document.querySelector('.carousel-3d-wrapper');
            const cards = document.querySelectorAll('.video-card');
            const prevBtn = document.querySelector('.carousel-3d-prev');
            const nextBtn = document.querySelector('.carousel-3d-next');
            const modal = document.querySelector('.video-modal');
            const modalIframe = modal.querySelector('iframe');
            const modalClose = modal.querySelector('.modal-close');
            
            let currentIndex = 0;
            const totalCards = cards.length;
            
            // 更新卡片状态
            const updateCards = () => {
                cards.forEach((card, index) => {
                    card.className = 'video-card';
                    
                    // 计算相对位置
                    const diff = (index - currentIndex + totalCards) % totalCards;
                    
                    if (diff === 0) {
                        card.classList.add('active');
                    } else if (diff === 1) {
                        card.classList.add('next');
                    } else if (diff === totalCards - 1) {
                        card.classList.add('prev');
                    } else if (diff === 2) {
                        card.classList.add('far-next');
                    } else if (diff === totalCards - 2) {
                        card.classList.add('far-prev');
                    }
                });
            };
            
            // 初始化显示
            updateCards();
            
            // 切换到上一个视频
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                updateCards();
            });
            
            // 切换到下一个视频
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalCards;
                updateCards();
            });
            
            // 点击播放视频
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    if (card.classList.contains('active')) {
                        const videoId = card.dataset.videoId;
                        modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    } else {
                        // 如果点击的不是当前激活的卡片，将其旋转到中间
                        const clickedIndex = Array.from(cards).indexOf(card);
                        const diff = clickedIndex - currentIndex;
                        if (diff < 0) {
                            for (let i = 0; i > diff; i--) {
                                prevBtn.click();
                            }
                        } else {
                            for (let i = 0; i < diff; i++) {
                                nextBtn.click();
                            }
                        }
                    }
                });
            });
            
            // 关闭视频
            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
                modalIframe.src = '';
                document.body.style.overflow = '';
            });
            
            // 点击背景关闭视频
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modalClose.click();
                }
            });
            
            // 键盘控制
            document.addEventListener('keydown', (e) => {
                if (!modal.classList.contains('active')) {
                    if (e.key === 'ArrowLeft') {
                        prevBtn.click();
                    } else if (e.key === 'ArrowRight') {
                        nextBtn.click();
                    }
                } else if (e.key === 'Escape') {
                    modalClose.click();
                }
            });
            
            // 自动轮播
            let autoplayInterval;
            
            const startAutoplay = () => {
                autoplayInterval = setInterval(() => {
                    nextBtn.click();
                }, 5000);
            };
            
            const stopAutoplay = () => {
                clearInterval(autoplayInterval);
            };
            
            // 启动自动轮播
            startAutoplay();
            
            // 鼠标悬停时停止自动轮播
            wrapper.addEventListener('mouseenter', stopAutoplay);
            wrapper.addEventListener('mouseleave', startAutoplay);
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