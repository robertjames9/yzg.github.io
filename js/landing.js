// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加Hero区域动画效果
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(function() {
            heroContent.classList.add('active');
        }, 300);
    }
    
    // 初始化粒子效果
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#d4af37"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#d4af37",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // 价格表选项卡切换功能
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingTables = document.querySelectorAll('.pricing-table-container');
    
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有选项卡的active类
            pricingTabs.forEach(t => t.classList.remove('active'));
            // 为当前点击的选项卡添加active类
            this.classList.add('active');
            
            // 获取目标表格ID
            const targetId = this.getAttribute('data-target') + '-table';
            
            // 隐藏所有表格
            pricingTables.forEach(table => {
                table.classList.remove('active');
            });
            
            // 显示目标表格
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 处理视频延迟加载
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    
    // 创建一个交叉观察器来检测元素何时进入视口
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                observer.unobserve(iframe);
            }
        });
    });
    
    // 观察所有延迟加载的iframe
    lazyIframes.forEach(iframe => {
        observer.observe(iframe);
    });
    
    // 移动菜单切换功能
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // 防止背景滚动
        });
        
        // 点击导航链接时关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 用户反馈轮播功能
    const items = document.querySelectorAll('.feedback-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (items.length > 0) {
        let currentIndex = 0;
        const itemCount = items.length;
        
        // 初始化卡片位置
        function initializeCards() {
            items.forEach((item, index) => {
                item.classList.remove('active', 'prev', 'next', 'back');
                
                if (index === currentIndex) {
                    item.classList.add('active');
                } else if (index === getPrevIndex()) {
                    item.classList.add('prev');
                } else if (index === getNextIndex()) {
                    item.classList.add('next');
                } else {
                    item.classList.add('back');
                }
            });
            
            // 更新指示点
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // 获取前一个索引
        function getPrevIndex() {
            return (currentIndex - 1 + itemCount) % itemCount;
        }
        
        // 获取后一个索引
        function getNextIndex() {
            return (currentIndex + 1) % itemCount;
        }
        
        // 切换到下一个
        function nextSlide() {
            currentIndex = getNextIndex();
            initializeCards();
        }
        
        // 切换到上一个
        function prevSlide() {
            currentIndex = getPrevIndex();
            initializeCards();
        }
        
        // 点击指示点
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== currentIndex) {
                    currentIndex = index;
                    initializeCards();
                }
            });
        });
        
        // 点击按钮
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // 初始化卡片
        initializeCards();
        
        // 自动轮播
        let autoplayInterval = setInterval(nextSlide, 5000);
        
        // 鼠标悬停时暂停自动轮播
        const carousel = document.querySelector('.feedback-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoplayInterval);
            });
            
            carousel.addEventListener('mouseleave', () => {
                autoplayInterval = setInterval(nextSlide, 5000);
            });
        }
    }
    
    // 快速测试功能
    const testOptions = document.querySelectorAll('.test-option');
    const testResults = document.querySelectorAll('.test-result');
    
    testOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选项的active类
            testOptions.forEach(opt => opt.classList.remove('active'));
            // 为当前点击的选项添加active类
            this.classList.add('active');
            
            // 隐藏所有结果
            testResults.forEach(result => result.classList.remove('active'));
            
            // 显示对应结果
            const resultId = this.getAttribute('data-result') + '-result';
            document.getElementById(resultId).classList.add('active');
        });
    });
    
    // 使用事件委托优化FAQ点击事件
    const faqList = document.querySelector('.faq-list');
    if (faqList) {
        faqList.addEventListener('click', function(e) {
            const question = e.target.closest('.faq-question');
            if (question) {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
            }
        });
    } else {
        // 如果找不到.faq-list容器，回退到直接绑定方式
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    item.classList.toggle('active');
                });
            }
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加打字机效果到Hero标题
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // 添加闪烁效果到限时优惠区域
    const limitedOffer = document.querySelector('.limited-offer');
    if (limitedOffer) {
        setInterval(function() {
            limitedOffer.classList.toggle('pulse');
        }, 2000);
    }

    // 使用事件委托优化测试选项点击事件
    const testOptionsContainer = document.querySelector('.test-options');
    if (testOptionsContainer) {
        testOptionsContainer.addEventListener('click', function(e) {
            const option = e.target.closest('.test-option');
            if (option) {
                const testOptions = document.querySelectorAll('.test-option');
                const testResults = document.querySelectorAll('.test-result');
                
                // 移除所有选项的active类
                testOptions.forEach(opt => opt.classList.remove('active'));
                // 为当前点击的选项添加active类
                option.classList.add('active');
                
                // 隐藏所有结果
                testResults.forEach(result => result.classList.remove('active'));
                
                // 显示对应结果
                const resultId = option.getAttribute('data-result') + '-result';
                const targetResult = document.getElementById(resultId);
                if (targetResult) {
                    targetResult.classList.add('active');
                }
            }
        });
    }

    // 初始化倒计时
    startCountdown();
    
    // 初始化测试选项
    initTestOptions();
});

// 倒计时功能
function startCountdown() {
    // 设置倒计时结束日期（当前日期加7天）
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 100);
    
    function updateCountdown() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            // 倒计时结束
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // 计算剩余时间
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // 更新显示
        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // 立即更新一次
    updateCountdown();
    
    // 每秒更新一次
    setInterval(updateCountdown, 1000);
}

// 测试选项功能
function initTestOptions() {
    const testOptions = document.querySelectorAll('.test-option');
    const testResults = document.querySelectorAll('.test-result');
    
    testOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选项的active类
            testOptions.forEach(opt => opt.classList.remove('active'));
            
            // 为当前选项添加active类
            this.classList.add('active');
            
            // 获取对应的结果ID
            const resultId = this.getAttribute('data-result') + '-result';
            
            // 隐藏所有结果
            testResults.forEach(result => result.classList.remove('active'));
            
            // 显示对应的结果
            document.getElementById(resultId).classList.add('active');
        });
    });
} 