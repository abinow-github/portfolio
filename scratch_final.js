const fs = require('fs');

let lines = fs.readFileSync('index.html', 'utf8').split(/\r?\n/);

// Fix .fs-btn and add new styles
let fsBtnIdx = lines.findIndex(l => l.includes('.fs-btn {'));
if (fsBtnIdx !== -1) {
    let endIdx = fsBtnIdx;
    while (!lines[endIdx].includes('}')) endIdx++;
    lines.splice(endIdx + 1, 0, 
        '        .fs-linkedin { background: #0077b5 !important; border-color: #0077b5 !important; }',
        '        .fs-linkedin svg { fill: #fff !important; }',
        '        .fs-linkedin:hover { filter: brightness(1.2); }',
        '        .fs-instagram { background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important; border-color: transparent !important; }',
        '        .fs-instagram svg { fill: #fff !important; }',
        '        .fs-instagram:hover { filter: brightness(1.2); }',
        '        .fs-resume { background: linear-gradient(135deg, rgba(31,194,99,0.85), rgba(12,92,54,0.95)) !important; border-color: transparent !important; }',
        '        .fs-resume svg { fill: #fff !important; }',
        '        .fs-resume:hover { filter: brightness(1.2); }'
    );
}

// Fix .btn-resume
let btnResumeIdx = lines.findIndex(l => l.includes('.btn-resume {'));
if (btnResumeIdx !== -1) {
    let endIdx = btnResumeIdx;
    while (!lines[endIdx].includes('.btn-resume:hover {')) {
        endIdx++;
        if (endIdx > btnResumeIdx + 30) break; 
    }
    let actualEnd = btnResumeIdx;
    for(let i=btnResumeIdx; i<btnResumeIdx+25; i++) {
        if(lines[i].includes('.btn-resume:hover { color: var(--txt); border-color: var(--border-hi); }')) {
            actualEnd = i;
            break;
        }
    }
    
    if (actualEnd > btnResumeIdx) {
        lines.splice(btnResumeIdx, (actualEnd - btnResumeIdx) + 1, 
            '        .btn-resume {',
            '            display: inline-flex; align-items: center; gap: .65rem;',
            '            font-family: "Inter", sans-serif;',
            '            font-size: .68rem; font-weight: 600;',
            '            letter-spacing: .15em; text-transform: uppercase;',
            '            color: #fff;',
            '            background: linear-gradient(135deg, rgba(31,194,99,0.85), rgba(12,92,54,0.95));',
            '            border: none;',
            '            padding: .85rem 1.6rem;',
            '            text-decoration: none;',
            '            position: relative; overflow: hidden;',
            '            transition: transform .3s, filter .3s, box-shadow .3s;',
            '            box-shadow: 0 10px 20px rgba(12,92,54,.2);',
            '        }',
            '        .btn-resume:hover {',
            '            filter: brightness(1.15);',
            '            transform: translateY(-2px);',
            '            box-shadow: 0 15px 25px rgba(12,92,54,.4);',
            '        }'
        );
    }
}

// Replace social cards
let scIdx = lines.findIndex(l => l.includes('<div class="social-cards" id="socialCards">'));
if (scIdx !== -1) {
    let scEndIdx = scIdx;
    while (!lines[scEndIdx].includes('</div>') || !lines[scEndIdx-1].includes('</a>')) {
        scEndIdx++;
        if (scEndIdx > scIdx + 50) break;
    }
    if (scEndIdx > scIdx) {
        lines.splice(scIdx, (scEndIdx - scIdx) + 1, 
            '        <div class="social-cards" id="socialCards">',
            '',
            '            <a href="https://www.linkedin.com/in/seetha-lakshmi-8a0200324/"',
            '               target="_blank" rel="noopener" class="social-card">',
            '                <span class="material-symbols-outlined" style="font-size:2rem;color:var(--accent-hi);margin-bottom:.5rem;">work</span>',
            '                <div class="sc-platform">LinkedIn</div>',
            '                <div class="sc-name">Seetha Lakshmi.M</div>',
            '                <div class="sc-handle">Professional Network →</div>',
            '                <span class="sc-arrow">↗</span>',
            '            </a>',
            '',
            '            <a href="https://digitztech.com/"',
            '               target="_blank" rel="noopener" class="social-card">',
            '                <span class="material-symbols-outlined" style="font-size:2rem;color:var(--accent-hi);margin-bottom:.5rem;">business</span>',
            '                <div class="sc-platform">Company</div>',
            '                <div class="sc-name">Digitz Technologies</div>',
            '                <div class="sc-handle">Current Workplace →</div>',
            '                <span class="sc-arrow">↗</span>',
            '            </a>',
            '',
            '            <a href="mailto:seethalakshmim2003@gmail.com" class="social-card">',
            '                <span class="material-symbols-outlined" style="font-size:2rem;color:var(--accent-hi);margin-bottom:.5rem;">mail</span>',
            '                <div class="sc-platform">Email</div>',
            '                <div class="sc-name">Gmail</div>',
            '                <div class="sc-handle">seethalakshmim2003@gmail.com</div>',
            '                <span class="sc-arrow">↗</span>',
            '            </a>',
            '',
            '            <a href="https://wa.me/917994952240" target="_blank" rel="noopener" class="social-card" style="border-right:none;">',
            '                <span class="material-symbols-outlined" style="font-size:2rem;color:var(--accent-hi);margin-bottom:.5rem;">chat</span>',
            '                <div class="sc-platform">WhatsApp</div>',
            '                <div class="sc-name">Chat with me</div>',
            '                <div class="sc-handle">+91 7994 952240</div>',
            '                <span class="sc-arrow">↗</span>',
            '            </a>',
            '',
            '        </div>'
        );
    }
}

fs.writeFileSync('index.html', lines.join('\\n'), 'utf8');
console.log('Final fixes applied successfully.');
