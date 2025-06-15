// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Language switcher
document.addEventListener('DOMContentLoaded', () => {
    const langSwitch = document.getElementById('langSwitch');
    const enElements = document.querySelectorAll('.en');
    const zhElements = document.querySelectorAll('.zh');
    
    // Set initial language
    let currentLang = 'en';
    
    // Language switch handler
    langSwitch.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        
        // Toggle language elements
        enElements.forEach(el => {
            el.classList.toggle('hidden', currentLang === 'zh');
        });
        
        zhElements.forEach(el => {
            el.classList.toggle('hidden', currentLang === 'en');
        });
        
        // Update button text
        langSwitch.querySelector('.en').textContent = currentLang === 'en' ? '中文' : 'English';
        langSwitch.querySelector('.zh').textContent = currentLang === 'en' ? '中文' : 'English';
        
        // Update HTML lang attribute
        document.documentElement.lang = currentLang;
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 