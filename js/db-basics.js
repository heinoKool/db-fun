// CSV-Export & Download werden jetzt über js/common.js bereitgestellt

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Setup ANSI-SPARC & Phasen via shared helper
    if (window.common && typeof window.common.setupInteractiveSection === 'function') {
        window.common.setupInteractiveSection('ebene-btn', 'ebene-content', 'active');
        window.common.setupInteractiveSection('phase-btn', 'phase-content', 'active');
    }

    // Setup Tabs (Bauplan) via shared helper
    if (window.common && typeof window.common.setupTabs === 'function') {
        window.common.setupTabs('.tab-btn', '.tab-content', 'content-');
    }

    // Setup Normalization Widget
    const normBtns = document.querySelectorAll('.norm-btn');
    const normContents = document.querySelectorAll('.norm-content');
    normBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            normBtns.forEach(b => b.classList.remove('active', 'bg-blue-600', 'text-white'));
            normBtns.forEach(b => b.classList.add('bg-stone-200', 'hover:bg-stone-300'));

            btn.classList.add('active', 'bg-blue-600', 'text-white');
            btn.classList.remove('bg-stone-200', 'hover:bg-stone-300');

            const targetNorm = btn.getAttribute('data-norm');

            normContents.forEach(c => c.classList.add('hidden'));
            const targetContent = document.getElementById(`content-${targetNorm}`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });

    // Setup SQL Cards (toggle)
    const sqlCards = document.querySelectorAll('.sql-card-header');
    sqlCards.forEach(cardHeader => {
        cardHeader.addEventListener('click', () => {
            const desc = cardHeader.nextElementSibling;
            if (desc) {
                desc.classList.toggle('hidden');
            }
        });
    });

    // Setup Export Buttons via shared helper
    if (window.common && typeof window.common.setupExportButtons === 'function') {
        window.common.setupExportButtons('.export-btn');
    }

});
