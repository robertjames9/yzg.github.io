// 价格表选项卡切换功能
document.addEventListener('DOMContentLoaded', function() {
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

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(function() {
            heroContent.classList.add('active');
        }, 100);
    }

    // 处理视频延迟加载
    // 处理所有带有data-src属性的iframe
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
    
    // 为视频缩略图添加点击事件
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            if (videoId) {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                
                this.innerHTML = '';
                this.appendChild(iframe);
            }
        });
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

    // 用户反馈轮播功能 - 3D洗牌效果
    const items = document.querySelectorAll('.feedback-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (items.length > 0) {
        let currentIndex = 0;
        const itemCount = items.length;
        
        // 添加移动设备检测
        function isMobileDevice() {
            return (window.innerWidth <= 768) || 
                   ('ontouchstart' in window) || 
                   (navigator.maxTouchPoints > 0);
        }

        // 在初始化卡片位置函数中添加移动设备处理
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
        
        // 修改切换函数，为移动设备简化动画
        function nextSlide() {
            if (isMobileDevice()) {
                // 移动设备上使用简单过渡
                currentIndex = getNextIndex();
                initializeCards();
            } else {
                // 桌面设备保持原有动画
                document.querySelector('.feedback-track').classList.add('shuffling');
                
                setTimeout(() => {
                    currentIndex = getNextIndex();
                    initializeCards();
                    
                    setTimeout(() => {
                        document.querySelector('.feedback-track').classList.remove('shuffling');
                    }, 50);
                }, 300);
            }
        }
        
        // 切换到上一个
        function prevSlide() {
            // 添加洗牌动画类
            document.querySelector('.feedback-track').classList.add('shuffling');
            
            // 短暂延迟后更新卡片位置
            setTimeout(() => {
                currentIndex = getPrevIndex();
                initializeCards();
                
                // 移除动画类
                setTimeout(() => {
                    document.querySelector('.feedback-track').classList.remove('shuffling');
                }, 50);
            }, 300);
        }
        
        // 点击指示点
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== currentIndex) {
                    // 添加洗牌动画类
                    document.querySelector('.feedback-track').classList.add('shuffling');
                    
                    // 短暂延迟后更新卡片位置
                    setTimeout(() => {
                        currentIndex = index;
                        initializeCards();
                        
                        // 移除动画类
                        setTimeout(() => {
                            document.querySelector('.feedback-track').classList.remove('shuffling');
                        }, 50);
                    }, 300);
                }
            });
        });
        
        // 点击按钮
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // 初始化卡片
        initializeCards();
        
        // 自动轮播
        let autoplayInterval = setInterval(nextSlide, 6000);
        
        // 鼠标悬停时暂停自动轮播
        const carousel = document.querySelector('.feedback-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoplayInterval);
            });
            
            carousel.addEventListener('mouseleave', () => {
                autoplayInterval = setInterval(nextSlide, 6000);
            });
        }
        
        // 添加洗牌动画CSS
        const style = document.createElement('style');
        style.textContent = `
            .feedback-track.shuffling .feedback-item {
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .feedback-track.shuffling .feedback-item.active {
                transform: translateZ(50px) scale(1.05) rotateY(5deg);
            }
        `;
        document.head.appendChild(style);
    }
}); 