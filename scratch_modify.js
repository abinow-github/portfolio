const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Material Symbols in Head
if (!html.includes('Material+Symbols+Outlined')) {
    html = html.replace(
        '</head>',
        '    <!-- Material Symbols -->\n    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />\n</head>'
    );
}

// 2. Add SEO background icons CSS
const floatIconCSS = `
        /* SEO Background Floating Icons */
        .seo-float-icon {
            position: absolute;
            color: var(--accent-hi);
            opacity: 0.12;
            pointer-events: none;
            animation: floatIcon 6s ease-in-out infinite;
            z-index: 0;
        }
        .seo-float-icon span { font-size: clamp(3rem, 5vw, 4.5rem); }
        @keyframes floatIcon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-25px); }
        }
`;
if (!html.includes('SEO Background Floating Icons')) {
    html = html.replace('/* ─────────────────────────────────────────\n           HERO\n        ───────────────────────────────────────── */', floatIconCSS + '\n        /* ─────────────────────────────────────────\n           HERO\n        ───────────────────────────────────────── */');
}

// 3. Move .hero-scan CSS
const oldHeroScanCSS = `        /* Thin horizontal accent line — scans across the hero */
        .hero-scan {
            position: absolute;
            left: 5%; right: 5%;
            height: 1px;
            background: linear-gradient(90deg,
                transparent 0%,
                rgba(31,194,99,.12) 20%,
                rgba(31,194,99,.32) 50%,
                rgba(31,194,99,.12) 80%,
                transparent 100%);
            top: 42%;
            pointer-events: none;
            animation: scanSlide 9s ease-in-out infinite;
        }
        @keyframes scanSlide {
            0%, 100% { top: 38%; opacity: .5; }
            50%       { top: 48%; opacity: 1;  }
        }`;

const newHeroScanCSS = `        /* Thin horizontal accent line — scans across the photo frame */
        .photo-frame .hero-scan {
            position: absolute;
            left: 0; right: 0;
            height: 3px;
            background: linear-gradient(90deg,
                transparent 0%,
                rgba(31,194,99,.5) 20%,
                rgba(31,194,99,1) 50%,
                rgba(31,194,99,.5) 80%,
                transparent 100%);
            top: 0;
            pointer-events: none;
            animation: scanSlide 3s linear infinite;
            z-index: 10;
        }
        @keyframes scanSlide {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }`;

html = html.replace(oldHeroScanCSS, newHeroScanCSS);

// 4. Social Card WhatsApp & Icons
const socialCardsOld = `<div class="social-cards" id="socialCards">

            <a href="https://www.linkedin.com/in/seetha-lakshmi-8a0200324/"
               target="_blank" rel="noopener" class="social-card">
                <div class="sc-platform">LinkedIn</div>
                <div class="sc-name">Seetha Lakshmi.M</div>
                <div class="sc-handle">Professional Network →</div>
                <span class="sc-arrow">↗</span>
            </a>

            <a href="https://digitztech.com/"
               target="_blank" rel="noopener" class="social-card">
                <div class="sc-platform">Company</div>
                <div class="sc-name">Digitz Technologies</div>
                <div class="sc-handle">Current Workplace →</div>
                <span class="sc-arrow">↗</span>
            </a>

            <a href="mailto:seethalakshmim2003@gmail.com" class="social-card">
                <div class="sc-platform">Email</div>
                <div class="sc-name">Gmail</div>
                <div class="sc-handle">seethalakshmim2003@gmail.com</div>
                <span class="sc-arrow">↗</span>
            </a>

        </div>`;

const socialCardsNew = `<div class="social-cards" id="socialCards">

            <a href="https://www.linkedin.com/in/seetha-lakshmi-8a0200324/"
               target="_blank" rel="noopener" class="social-card">
                <span class="material-symbols-outlined" style="font-size:2rem;color:var(--accent-hi);margin-bottom:.5rem;">work</span>
                <div class="sc-platform">LinkedIn</div>
                <div class="sc-name">Seetha Lakshmi.M</div>
                <div class="sc-handle">Professional Network →</div>
                <span class="sc-arrow">↗</span>
            </a>

            <a href="https://digitztech.com/"
               target="_blank" rel="noopener" class="social-card">
                <span class="material-symbols-outlined" style="font-size:2rem;color:var(--accent-hi);margin-bottom:.5rem;">business</span>
                <div class="sc-platform">Company</div>
                <div class="sc-name">Digitz Technologies</div>
                <div class="sc-handle">Current Workplace →</div>
                <span class="sc-arrow">↗</span>
            </a>

            <a href="mailto:seethalakshmim2003@gmail.com" class="social-card">
                <span class="material-symbols-outlined" style="font-size:2rem;color:var(--accent-hi);margin-bottom:.5rem;">mail</span>
                <div class="sc-platform">Email</div>
                <div class="sc-name">Gmail</div>
                <div class="sc-handle">seethalakshmim2003@gmail.com</div>
                <span class="sc-arrow">↗</span>
            </a>
            
            <a href="https://wa.me/917994952240" target="_blank" rel="noopener" class="social-card" style="border-right:none;">
                <span class="material-symbols-outlined" style="font-size:2rem;color:var(--accent-hi);margin-bottom:.5rem;">chat</span>
                <div class="sc-platform">WhatsApp</div>
                <div class="sc-name">Chat with me</div>
                <div class="sc-handle">+91 7994 952240</div>
                <span class="sc-arrow">↗</span>
            </a>

        </div>`;

html = html.replace(socialCardsOld, socialCardsNew);


// 5. Fixed Socials styling
const oldFsBtnCSS = `.fs-btn {
            width: 46px; height: 46px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-right: none;
            display: flex; align-items: center; justify-content: center;
            text-decoration: none;
            position: relative; overflow: hidden;
            transition: background .3s, border-color .3s, width .3s;
        }`;

const newFsBtnCSS = `.fs-btn {
            width: 46px; height: 46px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-right: none;
            display: flex; align-items: center; justify-content: center;
            text-decoration: none;
            position: relative; overflow: hidden;
            transition: background .3s, border-color .3s, width .3s, filter .3s;
        }
        .fs-linkedin { background: #0077b5 !important; border-color: #0077b5 !important; }
        .fs-linkedin svg { fill: #fff !important; }
        .fs-linkedin:hover { filter: brightness(1.2); }
        .fs-instagram { background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important; border-color: transparent !important; }
        .fs-instagram svg { fill: #fff !important; }
        .fs-instagram:hover { filter: brightness(1.2); }`;

html = html.replace(oldFsBtnCSS, newFsBtnCSS);

html = html.replace('class="fs-btn" aria-label="LinkedIn"', 'class="fs-btn fs-linkedin" aria-label="LinkedIn"');
html = html.replace('class="fs-btn" aria-label="Instagram"', 'class="fs-btn fs-instagram" aria-label="Instagram"');


// 6. Move hero-scan HTML & Add Floating Icons to Hero
html = html.replace('<div class="hero-scan"></div>\n    <div class="hero-vignette"></div>', '<div class="hero-vignette"></div>');
html = html.replace('<div class="photo-frame">\n                <img', '<div class="photo-frame">\n                <div class="hero-scan"></div>\n                <img');

const heroBgString = `<div class="hero-grid-bg"></div>`;
const floatHtml = `
    <div class="seo-float-icon" style="top:20%; left:8%; animation-delay: 0s;"><span class="material-symbols-outlined">trending_up</span></div>
    <div class="seo-float-icon" style="top:60%; left:12%; animation-delay: 1.5s;"><span class="material-symbols-outlined">manage_search</span></div>
    <div class="seo-float-icon" style="top:25%; right:12%; animation-delay: 0.7s;"><span class="material-symbols-outlined">bar_chart</span></div>
    <div class="seo-float-icon" style="top:70%; right:8%; animation-delay: 2.1s;"><span class="material-symbols-outlined">public</span></div>
`;
html = html.replace(heroBgString, heroBgString + '\n' + floatHtml);


// 7. btn-resume gradient styling
const oldBtnResumeCSS = `.btn-resume {
            display: inline-flex; align-items: center; gap: .65rem;
            font-family: 'Inter', sans-serif;
            font-size: .68rem; font-weight: 600;
            letter-spacing: .15em; text-transform: uppercase;
            color: var(--txt-2);
            border: 1px solid var(--border);
            padding: .85rem 1.6rem;
            text-decoration: none;
            position: relative; overflow: hidden;
            transition: color .3s, border-color .3s;
        }
        .btn-resume::before {
            content: '';
            position: absolute; inset: 0;
            background: rgba(142,16,17,.12);
            transform: scaleX(0); transform-origin: left;
            transition: transform .35s cubic-bezier(.7,0,.3,1);
        }
        .btn-resume:hover::before { transform: scaleX(1); }
        .btn-resume:hover { color: var(--txt); border-color: var(--border-hi); }`;

const newBtnResumeCSS = `.btn-resume {
            display: inline-flex; align-items: center; gap: .65rem;
            font-family: 'Inter', sans-serif;
            font-size: .68rem; font-weight: 600;
            letter-spacing: .15em; text-transform: uppercase;
            color: #fff;
            background: linear-gradient(135deg, rgba(31,194,99,0.85), rgba(12,92,54,0.95));
            border: none;
            padding: .85rem 1.6rem;
            text-decoration: none;
            position: relative; overflow: hidden;
            transition: transform .3s, filter .3s, box-shadow .3s;
            box-shadow: 0 10px 20px rgba(12,92,54,.2);
        }
        .btn-resume:hover {
            filter: brightness(1.15);
            transform: translateY(-2px);
            box-shadow: 0 15px 25px rgba(12,92,54,.4);
        }`;

html = html.replace(oldBtnResumeCSS, newBtnResumeCSS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Final modifications applied.');
