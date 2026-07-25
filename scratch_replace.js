const fs = require('fs');
let text = fs.readFileSync('index.html', 'utf8');

text = text.replace('family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400;1,600&display=swap', 'family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
text = text.replace('Syne (display) + Inter (body) + Cormorant Garamond (italic accents)', 'Outfit (display) + Inter (body)');

text = text.replace(/'Syne', sans-serif/g, "'Outfit', sans-serif");
text = text.replace(/'Cormorant Garamond', serif/g, "'Outfit', sans-serif");

text = text.replace(/clamp\(2\.8rem, 8vw, 7rem\)/g, 'clamp(2.2rem, 6vw, 5.5rem)');
text = text.replace(/clamp\(2\.2rem, 10vw, 3\.8rem\)/g, 'clamp(1.8rem, 8vw, 2.8rem)');
text = text.replace(/clamp\(2rem, 9vw, 3rem\)/g, 'clamp(1.5rem, 8vw, 2.2rem)');

fs.writeFileSync('index.html', text, 'utf8');
console.log('Replaced successfully.');
