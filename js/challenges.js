document.addEventListener('DOMContentLoaded', () => {
    // Tabs (challenge buttons)
    if (window.common && typeof window.common.setupTabs === 'function') {
        window.common.setupTabs('.challenge-btn', '.challenge-content', 'content-');
    }

    // Lösungen (passwort-geschützte Bereiche)
    if (window.common && typeof window.common.setupSolutionButtons === 'function') {
        window.common.setupSolutionButtons('.solution-btn');
    }
});
