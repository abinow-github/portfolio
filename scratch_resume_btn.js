const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldFsBtn = `class="fs-btn" aria-label="Download Resume"`;
const newFsBtn = `class="fs-btn fs-resume" aria-label="Download Resume"`;
html = html.replace(oldFsBtn, newFsBtn);

const newCSS = `
        .fs-resume { background: linear-gradient(135deg, rgba(31,194,99,0.85), rgba(12,92,54,0.95)) !important; border-color: transparent !important; }
        .fs-resume svg { fill: #fff !important; }
        .fs-resume:hover { filter: brightness(1.2); }
`;
html = html.replace('.fs-instagram:hover { filter: brightness(1.2); }', '.fs-instagram:hover { filter: brightness(1.2); }' + newCSS);

fs.writeFileSync('index.html', html, 'utf8');
