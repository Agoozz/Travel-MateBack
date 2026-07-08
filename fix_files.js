const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath, replacements) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
};

// Fix HTML paths
const htmlFiles = ['inicio.html', 'mensajes.html', 'perfil.html'];
for (const file of htmlFiles) {
    replaceInFile(path.join(__dirname, 'frontend', file), [
        ['../styles.css', 'styles.css'],
        ['../images/', 'images/'],
        ['../js/', 'js/']
    ]);
}

// Fix JS fetch URLs
const jsFiles = ['dashboard.js', 'perfiles.js', 'auth.js', 'mensajes.js', 'perfil.js', 'chat.js', 'main.js', 'traveler-test.js'];
for (const file of jsFiles) {
    replaceInFile(path.join(__dirname, 'frontend', 'js', file), [
        ['fetch("/api/', 'fetch("http://localhost:3000/api/'],
        ['fetch(`/api/', 'fetch(`http://localhost:3000/api/'],
        ['fetch( `/api/', 'fetch( `http://localhost:3000/api/']
    ]);
}

console.log("Done");
