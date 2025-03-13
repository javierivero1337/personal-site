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
            
            // Set active state based on theme
            if (theme === 'light') {
                lightModeBtn.classList.add('active');
                topLightModeBtn.classList.add('active');
            } else if (theme === 'dark') {
                darkModeBtn.classList.add('active');
                topDarkModeBtn.classList.add('active');
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

        // Check for saved theme preference or use system preference as default
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
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
        
        // Listen for system changes to update if no preference is set
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
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
                showMoreBtn.textContent = 'Show Less Articles';
            } else {
                hiddenEntries.classList.remove('visible');
                // Wait for the transition to complete before hiding the element
                setTimeout(() => {
                    hiddenEntries.classList.add('hidden');
                }, 500); // Match this with the transition duration in CSS
                showMoreBtn.textContent = 'Show More Articles';
            }
        });
    }

    // We no longer need JavaScript hover effects as they're handled by CSS
}); 