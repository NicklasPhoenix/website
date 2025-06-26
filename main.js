// main.js - Final Stable Version

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('mobile-open');
        });
    }

    // --- GRID FILTERING with ISOTOPE ---
    const solutionsGrid = document.querySelector('.solutions-grid');
    if (solutionsGrid) {
        
        const iso = new Isotope(solutionsGrid, {
            itemSelector: '.solution-card',
            layoutMode: 'fitRows',
            percentPosition: true,
            transitionDuration: '0.6s'
        });

        const filterContainer = document.querySelector('.filter-button-group');
        filterContainer.addEventListener('click', (event) => {
            if (!event.target.matches('button')) return;
            
            filterContainer.querySelector('.is-checked').classList.remove('is-checked');
            event.target.classList.add('is-checked');

            const filterValue = event.target.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
        });
    }

    // --- CODE SNIPPET TABS & COPY BUTTON ---
    const codeShowcase = document.querySelector('.code-showcase');
    if (codeShowcase) {
        const tabContainer = codeShowcase.querySelector('#code-tabs');
        tabContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('code-tab-btn')) {
                const lang = e.target.dataset.lang;
                tabContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                
                codeShowcase.querySelectorAll('.code-pane').forEach(p => {
                    p.classList.toggle('active', p.dataset.lang === lang);
                });
            }
        });
        
        codeShowcase.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', () => {
                const code = button.nextElementSibling.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    button.innerHTML = '<span class="material-icons-outlined">done</span>';
                    setTimeout(() => {
                        button.innerHTML = '<span class="material-icons-outlined">content_copy</span>';
                    }, 2000);
                });
            });
        });
    }

    // --- SCROLL ANIMATIONS ---
    const animatedSections = document.querySelectorAll('.animated-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedSections.forEach(section => observer.observe(section));

    // --- DYNAMIC COPYRIGHT YEAR ---
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
});