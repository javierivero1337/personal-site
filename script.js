// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if it's open when clicking a navigation link
                const mobileMenu = document.getElementById('mobile-nav-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    document.body.classList.remove('overflow-hidden');
                }
            }
        });
    });

    // Handle sticky navigation - simplified approach
    const stickyNav = document.getElementById('sticky-nav');
    
    if (stickyNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                stickyNav.classList.add('visible');
            } else {
                stickyNav.classList.remove('visible');
            }
        });
        
        // Check initial scroll position
        if (window.scrollY > 100) {
            stickyNav.classList.add('visible');
        }
    }

    // Mobile menu functionality (only for the full-screen menu)
    const closeMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-nav-menu');
    const stickyNavTitle = document.getElementById('sticky-nav-title');
    
    if (closeMenuButton && mobileMenu) {
        // Open mobile menu when clicking on the name in sticky nav
        if (stickyNavTitle) {
            stickyNavTitle.addEventListener('click', function() {
                mobileMenu.classList.remove('hidden');
                document.body.classList.add('overflow-hidden'); // Prevent scrolling when menu is open
            });
        }
        
        // Close mobile menu
        closeMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }

    // Add current year to the footer copyright
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add a simple animation to the profile picture when the page loads
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
        setTimeout(() => {
            profilePic.classList.add('loaded');
        }, 300);
    }

    // Theme toggle with segmented control
    const lightModeBtn = document.getElementById('light-mode-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const themeButtons = [lightModeBtn, darkModeBtn];
    
    // Top theme toggle buttons
    const topLightModeBtn = document.getElementById('top-light-mode-btn');
    const topDarkModeBtn = document.getElementById('top-dark-mode-btn');
    const topThemeButtons = [topLightModeBtn, topDarkModeBtn];
    
    // Mobile menu theme toggle buttons
    const mobileLightModeBtn = document.getElementById('mobile-light-mode-btn');
    const mobileDarkModeBtn = document.getElementById('mobile-dark-mode-btn');
    const mobileThemeButtons = mobileLightModeBtn && mobileDarkModeBtn ? [mobileLightModeBtn, mobileDarkModeBtn] : [];
    
    if (lightModeBtn && darkModeBtn && topLightModeBtn && topDarkModeBtn) {
        
        // Function to update active button
        const setActiveThemeButton = (theme) => {
            // Clear all active states
            themeButtons.forEach(btn => {
                if (btn) btn.classList.remove('active');
            });
            topThemeButtons.forEach(btn => {
                if (btn) btn.classList.remove('active');
            });
            mobileThemeButtons.forEach(btn => {
                if (btn) btn.classList.remove('active');
            });
            
            // Set active state based on theme
            if (theme === 'light') {
                lightModeBtn.classList.add('active');
                topLightModeBtn.classList.add('active');
                if (mobileLightModeBtn) mobileLightModeBtn.classList.add('active');
            } else if (theme === 'dark') {
                darkModeBtn.classList.add('active');
                topDarkModeBtn.classList.add('active');
                if (mobileDarkModeBtn) mobileDarkModeBtn.classList.add('active');
            }
        };

        // Function to apply theme
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
                setActiveThemeButton('dark');
            } else {
                document.body.classList.remove('dark-mode');
                setActiveThemeButton('light');
            }
        };

        // Check for saved theme preference or use light theme as default
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        // Add event listeners for sticky nav theme buttons
        lightModeBtn.addEventListener('click', function() {
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        });

        darkModeBtn.addEventListener('click', function() {
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        });
        
        // Add event listeners for top theme buttons
        topLightModeBtn.addEventListener('click', function() {
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        });

        topDarkModeBtn.addEventListener('click', function() {
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        });
        
        // Add event listeners for mobile menu theme buttons
        if (mobileLightModeBtn) {
            mobileLightModeBtn.addEventListener('click', function() {
                localStorage.setItem('theme', 'light');
                applyTheme('light');
            });
        }
        
        if (mobileDarkModeBtn) {
            mobileDarkModeBtn.addEventListener('click', function() {
                localStorage.setItem('theme', 'dark');
                applyTheme('dark');
            });
        }
    }

    // Show More functionality with smooth transition
    const showMoreBtn = document.getElementById('show-more-btn');
    const hiddenEntries = document.getElementById('hidden-entries');
    let isExpanded = false;

    if (showMoreBtn && hiddenEntries) {
        showMoreBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                hiddenEntries.classList.remove('hidden');
                // Use setTimeout to ensure the class is added after the hidden class is removed
                setTimeout(() => {
                    hiddenEntries.classList.add('visible');
                }, 10);
                showMoreBtn.textContent = 'Show Less';
            } else {
                hiddenEntries.classList.remove('visible');
                // Wait for the transition to complete before hiding the element
                setTimeout(() => {
                    hiddenEntries.classList.add('hidden');
                }, 500); // Match this with the transition duration in CSS
                showMoreBtn.textContent = 'Show More';
            }
        });
    }

    // We no longer need JavaScript hover effects as they're handled by CSS
}); 