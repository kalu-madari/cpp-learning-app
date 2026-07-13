const fs = require('fs');
const path = require('path');

function verifyBindings() {
    console.log('Verifying DOM bindings between index.html and app.js...');

    const indexPath = path.join(__dirname, 'renderer', 'index.html');
    const appPath = path.join(__dirname, 'renderer', 'js', 'app.js');

    const indexHtml = fs.readFileSync(indexPath, 'utf8');
    const appJs = fs.readFileSync(appPath, 'utf8');

    // The specific button we need to check
    const requiredId = 'btn-example-code';

    // 1. Check if ID exists in index.html
    if (!indexHtml.includes(`id="${requiredId}"`)) {
        console.error(`ERROR: Element with id="${requiredId}" not found in index.html`);
        process.exit(1);
    }

    // 2. Check if app.js looks it up
    const lookupPattern = `document.getElementById('${requiredId}')`;
    if (!appJs.includes(lookupPattern)) {
        console.error(`ERROR: DOM lookup "${lookupPattern}" not found in app.js`);
        process.exit(1);
    }

    // 3. Check if an event listener is likely attached (specifically for the button)
    // We expect something like btnExample.addEventListener('click'
    if (!appJs.includes('addEventListener(\'click\', loadExampleCode)')) {
        console.error(`ERROR: Event listener registration for loadExampleCode not found in app.js`);
        process.exit(1);
    }

    // 4. Check Terminal IDs
    const terminalIds = ['terminal-panel', 'terminal-transcript', 'terminal-input'];
    for (const tid of terminalIds) {
        if (!indexHtml.includes(`id="${tid}"`)) {
            console.error(`ERROR: Terminal DOM element with id="${tid}" not found in index.html`);
            process.exit(1);
        }
    }
    if (!indexHtml.includes(`data-tab="terminal"`)) {
        console.error(`ERROR: Terminal tab button not found in index.html`);
        process.exit(1);
    }

    // 5. Ensure all getElementById in app.js exist in index.html (except dynamically created ones)
    const allowedDynamicIds = ['fallback-editor'];
    const idRegex = /getElementById\(['"]([^'"]+)['"]\)/g;
    let match;
    const requiredIds = [];
    while ((match = idRegex.exec(appJs)) !== null) {
        requiredIds.push(match[1]);
    }
    const uniqueIds = [...new Set(requiredIds)];
    let missingCount = 0;
    for (const id of uniqueIds) {
        if (allowedDynamicIds.includes(id)) continue;
        if (!indexHtml.includes(`id="${id}"`)) {
            console.error(`ERROR: DOM Element with id="${id}" not found in index.html (referenced in app.js)`);
            missingCount++;
        }
    }

    if (missingCount > 0) {
        process.exit(1);
    }

    // 6. Ensure clearOutput clears the terminal
    if (!appJs.includes('resetTerminal()') || appJs.indexOf('resetTerminal()', appJs.indexOf('function clearOutput')) === -1) {
        // Simple check to ensure resetTerminal is likely called within clearOutput or exists
        // Wait, index of resetTerminal after function clearOutput is a decent heuristic.
        // Actually just regex: /function clearOutput\(\) \{[\s\S]*?resetTerminal\(\)/
        const clearOutputMatch = /function clearOutput\(\)[\s\S]*?resetTerminal\(\)/.test(appJs);
        if (!clearOutputMatch) {
            console.error('ERROR: clearOutput does not appear to call resetTerminal()');
            process.exit(1);
        }
    }

    console.log('✅ DOM bindings verification passed.');
}

try {
    verifyBindings();
} catch (e) {
    console.error('Verification failed:', e);
    process.exit(1);
}
