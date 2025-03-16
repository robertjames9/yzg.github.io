// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 添加Hero区域动画效果
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    setTimeout(function () {
      heroContent.classList.add("active");
    }, 300);
  }

  // 初始化粒子效果
  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-js")
  ) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            value_area: 900,
          },
        },
        color: {
          value: "#FFD700",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 2.5,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#d4af37",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }

  // 价格表选项卡切换功能
  const pricingTabs = document.querySelectorAll(".pricing-tab");
  const pricingTables = document.querySelectorAll(".pricing-table-container");

  pricingTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // 移除所有选项卡的active类
      pricingTabs.forEach((t) => t.classList.remove("active"));
      // 为当前点击的选项卡添加active类
      this.classList.add("active");

      // 获取目标表格ID
      const targetId = this.getAttribute("data-target") + "-table";

      // 隐藏所有表格
      pricingTables.forEach((table) => {
        table.classList.remove("active");
      });

      // 显示目标表格
      document.getElementById(targetId).classList.add("active");
    });
  });

  // 处理视频延迟加载
  const lazyIframes = document.querySelectorAll("iframe[data-src]");

  // 创建一个交叉观察器来检测元素何时进入视口
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        observer.unobserve(iframe);
      }
    });
  });

  // 观察所有延迟加载的iframe
  lazyIframes.forEach((iframe) => {
    observer.observe(iframe);
  });

  // 移动菜单切换功能
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll"); // 防止背景滚动
    });

    // 点击导航链接时关闭菜单
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  // 快速测试功能
  const testOptions = document.querySelectorAll(".test-option");
  const testResults = document.querySelectorAll(".test-result");

  testOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // 移除所有选项的active类
      testOptions.forEach((opt) => opt.classList.remove("active"));
      // 为当前点击的选项添加active类
      this.classList.add("active");

      // 隐藏所有结果
      testResults.forEach((result) => result.classList.remove("active"));

      // 显示对应结果
      const resultId = this.getAttribute("data-result") + "-result";
      document.getElementById(resultId).classList.add("active");
    });
  });

  // 使用事件委托优化FAQ点击事件
  const faqList = document.querySelector(".faq-list");
  if (faqList) {
    // 获取所有 FAQ 问题元素
    const faqQuestions = document.querySelectorAll(".faq-question");

    // 为每个问题添加点击事件
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        // 获取当前问题的父元素（faq-item）
        const faqItem = this.parentElement;
        const answer = this.nextElementSibling;

        // 如果当前项目已经是激活状态，则关闭它
        if (faqItem.classList.contains("active")) {
          faqItem.classList.remove("active");
          answer.style.maxHeight = "0";
          answer.style.paddingTop = "0";
          answer.style.paddingBottom = "0";
        } else {
          // 关闭所有其他激活的 FAQ 项目
          document
            .querySelectorAll(".faq-item.active")
            .forEach((activeItem) => {
              if (activeItem !== faqItem) {
                activeItem.classList.remove("active");
                const activeAnswer = activeItem.querySelector(".faq-answer");
                activeAnswer.style.maxHeight = "0";
                activeAnswer.style.paddingTop = "0";
                activeAnswer.style.paddingBottom = "0";
              }
            });

          // 打开当前项目
          faqItem.classList.add("active");
          
          // 先设置 padding，确保在计算高度时包含 padding
          answer.style.paddingTop = "2rem";
          answer.style.paddingBottom = "2rem";
          
          // 使用更可靠的方法计算高度
          // 1. 先克隆答案元素
          const clone = answer.cloneNode(true);
          // 2. 设置克隆元素的样式，使其不可见但保持布局
          clone.style.position = "absolute";
          clone.style.visibility = "hidden";
          clone.style.maxHeight = "none";
          clone.style.height = "auto";
          // 3. 添加到文档中
          document.body.appendChild(clone);
          // 4. 获取实际高度
          const realHeight = clone.scrollHeight;
          // 5. 移除克隆元素
          document.body.removeChild(clone);
          // 6. 设置原始元素的高度
          answer.style.maxHeight = realHeight + "px";
        }
      });
    });

    // 处理窗口大小调整，重新计算高度
    window.addEventListener("resize", function () {
      document.querySelectorAll(".faq-item.active").forEach((activeItem) => {
        const answer = activeItem.querySelector(".faq-answer");
        
        // 使用相同的克隆方法重新计算高度
        const clone = answer.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.maxHeight = "none";
        clone.style.height = "auto";
        document.body.appendChild(clone);
        const realHeight = clone.scrollHeight;
        document.body.removeChild(clone);
        
        answer.style.maxHeight = realHeight + "px";
      });
    });
  } else {
    // 如果找不到.faq-list容器，回退到直接绑定方式
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (question) {
        question.addEventListener("click", function () {
          const wasActive = item.classList.contains("active");
          
          // 关闭所有项目
          faqItems.forEach(i => {
            i.classList.remove("active");
            const ans = i.querySelector(".faq-answer");
            if (ans) {
              ans.style.maxHeight = "0";
              ans.style.paddingTop = "0";
              ans.style.paddingBottom = "0";
            }
          });
          
          // 如果之前不是激活状态，则打开当前项目
          if (!wasActive) {
            item.classList.add("active");
            const answer = item.querySelector(".faq-answer");
            if (answer) {
              answer.style.paddingTop = "2rem";
              answer.style.paddingBottom = "2rem";
              
              // 使用克隆方法计算实际高度
              const clone = answer.cloneNode(true);
              clone.style.position = "absolute";
              clone.style.visibility = "hidden";
              clone.style.maxHeight = "none";
              clone.style.height = "auto";
              document.body.appendChild(clone);
              const realHeight = clone.scrollHeight;
              document.body.removeChild(clone);
              
              answer.style.maxHeight = realHeight + "px";
            }
          }
        });
      }
    });
  }

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight =
          document.querySelector(".site-header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 添加闪烁效果到限时优惠区域
  const limitedOffer = document.querySelector(".limited-offer");
  if (limitedOffer) {
    setInterval(function () {
      limitedOffer.classList.toggle("pulse");
    }, 2000);
  }

  // 使用事件委托优化测试选项点击事件
  const testOptionsContainer = document.querySelector(".test-options");
  if (testOptionsContainer) {
    testOptionsContainer.addEventListener("click", function (e) {
      const option = e.target.closest(".test-option");
      if (option) {
        const testOptions = document.querySelectorAll(".test-option");
        const testResults = document.querySelector(".test-results");
        const allTestResults = document.querySelectorAll(".test-result");

        // 移除所有选项的active类
        testOptions.forEach((opt) => opt.classList.remove("active"));
        // 为当前点击的选项添加active类
        option.classList.add("active");

        // 显示结果容器
        if (testResults) {
          testResults.style.display = "block";
        }

        // 隐藏所有结果
        allTestResults.forEach((result) => result.classList.remove("active"));

        // 显示对应结果
        const resultId = option.getAttribute("data-result") + "-result";
        const targetResult = document.getElementById(resultId);
        if (targetResult) {
          targetResult.classList.add("active");
          // 添加延迟以确保动画效果完整显示
          setTimeout(() => {
            targetResult.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 300);
        }
      }
    });
  }

  // 初始化测试选项
  initTestOptions();
});

// 测试选项功能
function initTestOptions() {
  const testOptions = document.querySelectorAll(".test-option");
  const testResults = document.querySelectorAll(".test-result");

  testOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // 移除所有选项的active类
      testOptions.forEach((opt) => opt.classList.remove("active"));

      // 为当前选项添加active类
      this.classList.add("active");

      // 获取对应的结果ID
      const resultId = this.getAttribute("data-result") + "-result";

      // 隐藏所有结果
      testResults.forEach((result) => result.classList.remove("active"));

      // 显示对应的结果
      document.getElementById(resultId).classList.add("active");
    });
  });
}
