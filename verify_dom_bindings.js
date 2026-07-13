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

    console.log('✅ DOM bindings verification passed.');
}

try {
    verifyBindings();
} catch (e) {
    console.error('Verification failed:', e);
    process.exit(1);
}
