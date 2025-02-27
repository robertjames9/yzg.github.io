/**
 * 语言切换器功能
 * 处理网站语言切换的交互
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取语言切换器元素
    const languageSwitcher = document.querySelector('.language-switcher');
    const currentLanguage = document.querySelector('.current-language');
    
    // 如果元素存在，添加点击事件
    if (languageSwitcher && currentLanguage) {
        // 点击当前语言显示/隐藏下拉菜单
        currentLanguage.addEventListener('click', function(e) {
            e.stopPropagation();
            languageSwitcher.classList.toggle('active');
        });
        
        // 点击页面其他区域关闭下拉菜单
        document.addEventListener('click', function() {
            languageSwitcher.classList.remove('active');
        });
        
        // 阻止下拉菜单点击事件冒泡
        const dropdown = languageSwitcher.querySelector('.language-dropdown');
        if (dropdown) {
            dropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // 获取当前页面URL
    const currentPath = window.location.pathname;
    const isEnglish = currentPath.includes('index-en.html');
    
    // 更新当前语言显示
    const languageText = currentLanguage.querySelector('span');
    if (languageText) {
        languageText.textContent = isEnglish ? 'English' : '中文';
    }
    
    // 标记当前活动的语言选项
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        const href = option.getAttribute('href');
        if ((isEnglish && href.includes('index-en.html')) || 
            (!isEnglish && href === 'index.html')) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
        
        // 添加语言切换前的样式预加载
        option.addEventListener('click', function(e) {
            // 在跳转前预加载目标页面的样式
            const targetIsEnglish = href.includes('index-en.html');
            
            // 立即应用相应的CSS类到html元素
            if(targetIsEnglish) {
                document.documentElement.setAttribute('lang', 'en');
                // 预加载英文版特定样式
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.href = 'css/english-adjustments.css';
                preloadLink.as = 'style';
                document.head.appendChild(preloadLink);
            } else {
                document.documentElement.setAttribute('lang', 'zh');
            }
            
            // 允许正常导航继续
            localStorage.setItem('languageChanged', 'true');
        });
    });
    
    // 检查是否刚刚切换了语言
    if(localStorage.getItem('languageChanged') === 'true') {
        // 强制重新应用CSS
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if(href.includes('english-adjustments.css') || href.includes('style.css')) {
                // 重新加载样式表
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = href + '?v=' + new Date().getTime(); // 添加时间戳防止缓存
                document.head.appendChild(newLink);
                
                // 移除旧的样式表
                setTimeout(() => {
                    link.remove();
                }, 100);
            }
        });
        
        // 清除标记
        localStorage.removeItem('languageChanged');
    }
    
    // 针对英文版移动端导航优化
    if (isEnglish) {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            // 为英文版导航项添加特殊类
            link.classList.add('en-nav-item');
        });
        
        // 调整紫微斗数按钮
        const purpleStarBtn = document.querySelector('.nav-buttons .btn.primary');
        if (purpleStarBtn) {
            purpleStarBtn.style.fontSize = '13px';
            purpleStarBtn.style.padding = '0.75rem 1rem';
            purpleStarBtn.style.minWidth = '130px';
            purpleStarBtn.style.letterSpacing = '-0.3px';
            purpleStarBtn.style.fontWeight = '600';
            
            // 添加特殊类以便于CSS定位
            purpleStarBtn.classList.add('zi-wei-btn');
            
            // 优化按钮文本间距
            const btnText = purpleStarBtn.textContent;
            if (btnText.includes('Zi Wei Dou Shu')) {
                purpleStarBtn.innerHTML = 'Zi&nbsp;Wei&nbsp;Dou&nbsp;Shu';
            }
        }
        
        // 调整导航栏布局
        const navLinksContainer = document.querySelector('.nav-links');
        if (navLinksContainer && window.innerWidth > 768) {
            navLinksContainer.style.gap = '2.5rem';
            navLinksContainer.style.justifyContent = 'space-evenly';
        }
    }
    
    // 创建移动端菜单中的语言切换器
    function createMobileLanguageSwitcher() {
        if (window.innerWidth <= 768) {
            // 获取导航链接容器
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                // 创建或获取语言切换器容器
                let switcherContainer = document.querySelector('.mobile-language-container');
                if (!switcherContainer) {
                    switcherContainer = document.createElement('div');
                    switcherContainer.className = 'mobile-language-container';
                    navLinks.insertBefore(switcherContainer, navLinks.firstChild);
                }
                
                // 克隆语言切换器
                const languageSwitcherClone = languageSwitcher.cloneNode(true);
                languageSwitcherClone.id = 'mobile-language-switcher';
                
                // 将克隆的语言切换器添加到容器中
                switcherContainer.innerHTML = '';
                switcherContainer.appendChild(languageSwitcherClone);
                
                // 设置样式
                switcherContainer.style.display = 'block';
                switcherContainer.style.width = '100%';
                switcherContainer.style.padding = '5px 30px';
                switcherContainer.style.marginTop = '70px';
                switcherContainer.style.marginBottom = '20px';
                switcherContainer.style.textAlign = 'center';
                
                // 设置语言切换器样式
                languageSwitcherClone.style.margin = '0';
                languageSwitcherClone.style.width = '100%';
                languageSwitcherClone.style.display = 'block';
                
                // 设置当前语言样式
                const currentLang = languageSwitcherClone.querySelector('.current-language');
                if (currentLang) {
                    currentLang.style.textAlign = 'center';
                    currentLang.style.justifyContent = 'center';
                    currentLang.style.width = '100%';
                    currentLang.style.padding = '5px';
                    
                    // 重新添加点击事件
                    currentLang.addEventListener('click', function(e) {
                        e.stopPropagation();
                        languageSwitcherClone.classList.toggle('active');
                    });
                }
                
                // 阻止下拉菜单点击事件冒泡
                const dropdown = languageSwitcherClone.querySelector('.language-dropdown');
                if (dropdown) {
                    dropdown.addEventListener('click', function(e) {
                        e.stopPropagation();
                    });
                    
                    // 为语言选项添加点击事件
                    const options = dropdown.querySelectorAll('.language-option');
                    options.forEach(option => {
                        option.addEventListener('click', function(e) {
                            // 在跳转前预加载目标页面的样式
                            const href = this.getAttribute('href');
                            const targetIsEnglish = href.includes('index-en.html');
                            
                            // 立即应用相应的CSS类到html元素
                            if(targetIsEnglish) {
                                document.documentElement.setAttribute('lang', 'en');
                                // 预加载英文版特定样式
                                const preloadLink = document.createElement('link');
                                preloadLink.rel = 'preload';
                                preloadLink.href = 'css/english-adjustments.css';
                                preloadLink.as = 'style';
                                document.head.appendChild(preloadLink);
                            } else {
                                document.documentElement.setAttribute('lang', 'zh');
                            }
                            
                            localStorage.setItem('languageChanged', 'true');
                            window.location.href = this.getAttribute('href');
                        });
                    });
                }
            }
        }
    }
    
    // 页面加载时创建移动端语言切换器
    createMobileLanguageSwitcher();
    
    // 移动端菜单打开时处理语言切换器
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // 延迟执行，确保菜单已经打开
            setTimeout(function() {
                // 检查是否是移动端视图
                if (window.innerWidth <= 768) {
                    // 获取导航链接容器
                    const navLinks = document.querySelector('.nav-links');
                    
                    // 如果菜单已打开
                    if (navLinks && navLinks.classList.contains('active')) {
                        // 显示移动端语言切换器容器
                        const switcherContainer = document.querySelector('.mobile-language-container');
                        if (switcherContainer) {
                            switcherContainer.style.display = 'block';
                        } else {
                            // 如果容器不存在，重新创建
                            createMobileLanguageSwitcher();
                        }
                    }
                }
            }, 100);
        });
    }
    
    // 在移动端视图下，隐藏导航栏中的语言切换器
    function hideNavbarLanguageSwitcher() {
        if (window.innerWidth <= 768) {
            if (languageSwitcher) {
                languageSwitcher.style.display = 'none';
            }
        } else {
            if (languageSwitcher) {
                languageSwitcher.style.display = '';
            }
            
            // 桌面视图下，移除移动端语言切换器
            const mobileContainer = document.querySelector('.mobile-language-container');
            if (mobileContainer) {
                mobileContainer.style.display = 'none';
            }
        }
    }
    
    // 页面加载时执行
    hideNavbarLanguageSwitcher();
    
    // 窗口大小变化时执行
    window.addEventListener('resize', function() {
        hideNavbarLanguageSwitcher();
        if (window.innerWidth <= 768) {
            createMobileLanguageSwitcher();
        }
    });
});