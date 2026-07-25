const fs = require('fs');

let lines = fs.readFileSync('index.html', 'utf8').split(/\r?\n/);

// Find and remove outer .hero-scan
let scanIdx = lines.findIndex(l => l.includes('<div class="hero-scan"></div>') && lines[lines.indexOf(l)+1].includes('hero-vignette'));
if (scanIdx !== -1) {
    lines.splice(scanIdx, 1);
}

// Add hero-scan inside photo-frame
let frameIdx = lines.findIndex(l => l.includes('<div class="photo-frame">'));
if (frameIdx !== -1) {
    lines.splice(frameIdx + 1, 0, '                <div class="hero-scan"></div>');
}

// Add Material Symbols to head
let headIdx = lines.findIndex(l => l.includes('<!-- Tailwind CSS CDN -->'));
if (headIdx !== -1) {
    lines.splice(headIdx, 0, '    <!-- Material Symbols -->', '    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />\n');
}

fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
console.log('Fixed hero-scan and head.');
