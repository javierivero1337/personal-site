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

    // Theme toggle: sun (light) and code view
    const lightButtons = [
        document.getElementById('light-mode-btn'),
        document.getElementById('top-light-mode-btn'),
        document.getElementById('mobile-light-mode-btn')
    ].filter(Boolean);
    const codeButtons = [
        document.getElementById('code-mode-btn'),
        document.getElementById('top-code-mode-btn'),
        document.getElementById('mobile-code-mode-btn')
    ].filter(Boolean);

    if (lightButtons.length && codeButtons.length) {
        const setActiveThemeButton = (theme) => {
            [...lightButtons, ...codeButtons].forEach(btn => btn.classList.remove('active'));
            const activeButtons = theme === 'code' ? codeButtons : lightButtons;
            activeButtons.forEach(btn => btn.classList.add('active'));
        };

        const applyTheme = (theme) => {
            const profilePic = document.getElementById('profile-pic');
            const useCode = theme === 'code';

            document.body.classList.remove('dark-mode');
            document.documentElement.classList.remove('dark-mode');
            document.body.classList.toggle('code-mode', useCode);
            document.documentElement.classList.toggle('code-mode', useCode);

            if (profilePic) {
                profilePic.src = useCode ? 'img/profile-code.png' : 'img/profile.jpeg';
            }

            setActiveThemeButton(useCode ? 'code' : 'light');
        };

        let savedTheme = localStorage.getItem('theme');
        if (savedTheme !== 'code') {
            savedTheme = 'light';
            localStorage.setItem('theme', 'light');
        }
        applyTheme(savedTheme);

        lightButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                localStorage.setItem('theme', 'light');
                applyTheme('light');
            });
        });

        codeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                localStorage.setItem('theme', 'code');
                applyTheme('code');
            });
        });
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