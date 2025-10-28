// Gemeinsame Utilities für die Seiten (Tabs, Interaktive Sektionen, CSV-Export, Lösungstoggle)

function exportTableToCSV(table, filename) {
    let csv = [];
    const rows = table.querySelectorAll('tr');

    for (const row of rows) {
        const cols = row.querySelectorAll('th, td');
        const rowData = [];

        for (const col of cols) {
            let data = col.innerText.replace(/(\r\n|\n|\r)/gm, " ").trim();
            data = `"${data.replace(/"/g, '""')}"`;
            rowData.push(data);
        }
        csv.push(rowData.join(','));
    }

    const csvContent = csv.join('\n');
    downloadCSV(csvContent, filename);
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function setupInteractiveSection(btnClass, contentClass, activeClass) {
    const btns = document.querySelectorAll(`.${btnClass}`);
    const contents = document.querySelectorAll(`.${contentClass}`);

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove(activeClass, 'active'));
            btn.classList.add(activeClass, 'active');

            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            contents.forEach(c => c.classList.add('hidden'));
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
}

function setupTabs(btnSelector, contentSelector, contentIdPrefix = 'content-') {
    const tabBtns = document.querySelectorAll(btnSelector);
    const tabContents = document.querySelectorAll(contentSelector);

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetTab = btn.getAttribute('data-tab');

            tabContents.forEach(c => c.classList.add('hidden'));
            const targetContent = document.getElementById(`${contentIdPrefix}${targetTab}`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
}

function setupExportButtons(selector) {
    const exportButtons = document.querySelectorAll(selector);
    exportButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const tableId = button.dataset.targetTable;
            const filename = button.dataset.filename || 'export.csv';
            const table = document.getElementById(tableId);
            if (table) {
                exportTableToCSV(table, filename);
            } else {
                console.error('Could not find table with ID:', tableId);
            }
        });
    });
}

function setupSolutionButtons(selector) {
    const solutionBtns = document.querySelectorAll(selector);

    solutionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const passId = btn.getAttribute('data-pass');
            const msgId = passId ? passId.replace('pass', 'msg') : null;

            const solutionDiv = document.getElementById(targetId);
            const passInput = passId ? document.getElementById(passId) : null;
            const msgSpan = msgId ? document.getElementById(msgId) : null;

            if (!solutionDiv) return;
            if (!solutionDiv.classList.contains('hidden')) {
                solutionDiv.classList.add('hidden');
                btn.textContent = 'Lösung anzeigen';
                if (passInput) passInput.classList.remove('hidden');
                if (msgSpan) msgSpan.textContent = '';
            } else {
                if (!passInput || passInput.value === 'erm') {
                    solutionDiv.classList.remove('hidden');
                    btn.textContent = 'Lösung verbergen';
                    if (passInput) { passInput.value = ''; passInput.classList.add('hidden'); }
                    if (msgSpan) msgSpan.textContent = '';
                } else {
                    if (msgSpan) msgSpan.textContent = 'Falsches Passwort.';
                }
            }
        });
    });
}

// Export functions are intentionally global helpers for simplicity in this small project
window.common = {
    exportTableToCSV,
    downloadCSV,
    setupInteractiveSection,
    setupTabs,
    setupExportButtons,
    setupSolutionButtons
};
