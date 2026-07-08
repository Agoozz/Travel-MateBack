const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("Restoring pristine files from 7c85c0a...");
try {
    execSync('git restore --source=7c85c0a backend-mate/pantallas/iniciar_sesion.html backend-mate/pantallas/inicio.html backend-mate/pantallas/mensajes.html backend-mate/pantallas/perfil.html backend-mate/js/auth.js backend-mate/js/chat.js backend-mate/js/dashboard.js backend-mate/js/landing-data.js backend-mate/js/main.js backend-mate/js/mensajes.js backend-mate/js/perfil.js backend-mate/js/perfiles.js backend-mate/js/provinces.js backend-mate/js/theme.js backend-mate/js/traveler-test.js chat.js');
} catch (e) {
    console.error("Git restore failed", e);
}

console.log("Moving files to frontend/...");
const filesToMove = [
    { src: 'chat.js', dest: 'frontend/index.html' },
    { src: 'backend-mate/pantallas/iniciar_sesion.html', dest: 'frontend/iniciar_sesion.html' },
    { src: 'backend-mate/pantallas/inicio.html', dest: 'frontend/inicio.html' },
    { src: 'backend-mate/pantallas/mensajes.html', dest: 'frontend/mensajes.html' },
    { src: 'backend-mate/pantallas/perfil.html', dest: 'frontend/perfil.html' },
    { src: 'backend-mate/js/auth.js', dest: 'frontend/js/auth.js' },
    { src: 'backend-mate/js/chat.js', dest: 'frontend/js/chat.js' },
    { src: 'backend-mate/js/dashboard.js', dest: 'frontend/js/dashboard.js' },
    { src: 'backend-mate/js/landing-data.js', dest: 'frontend/js/landing-data.js' },
    { src: 'backend-mate/js/main.js', dest: 'frontend/js/main.js' },
    { src: 'backend-mate/js/mensajes.js', dest: 'frontend/js/mensajes.js' },
    { src: 'backend-mate/js/perfil.js', dest: 'frontend/js/perfil.js' },
    { src: 'backend-mate/js/perfiles.js', dest: 'frontend/js/perfiles.js' },
    { src: 'backend-mate/js/provinces.js', dest: 'frontend/js/provinces.js' },
    { src: 'backend-mate/js/theme.js', dest: 'frontend/js/theme.js' },
    { src: 'backend-mate/js/traveler-test.js', dest: 'frontend/js/traveler-test.js' }
];

for (const f of filesToMove) {
    if (fs.existsSync(f.src)) {
        fs.renameSync(f.src, f.dest);
    }
}

const replaceInFile = (filePath, replacements) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    fs.writeFileSync(filePath, content, 'utf8');
};

console.log("Applying safe string replacements...");

// HTML files
const htmlFiles = ['index.html', 'iniciar_sesion.html', 'inicio.html', 'mensajes.html', 'perfil.html'];
for (const file of htmlFiles) {
    replaceInFile(path.join(__dirname, 'frontend', file), [
        ['../styles.css', 'styles.css'],
        ['../images/', 'images/'],
        ['../js/', 'js/'],
        ['pantallas/', '']
    ]);
}

// JS Files
const jsFiles = ['auth.js', 'chat.js', 'dashboard.js', 'landing-data.js', 'main.js', 'mensajes.js', 'perfil.js', 'perfiles.js', 'provinces.js', 'theme.js', 'traveler-test.js'];
for (const file of jsFiles) {
    replaceInFile(path.join(__dirname, 'frontend', 'js', file), [
        ['fetch("/api/', 'fetch("http://localhost:3000/api/'],
        ['fetch(`/api/', 'fetch(`http://localhost:3000/api/'],
        ['fetch( `/api/', 'fetch( `http://localhost:3000/api/'],
        ['../images/', 'images/'],
        ['window.location.replace("index.html")', 'window.location.replace("inicio.html")']
    ]);
}

// Remove empty leftover dirs
try { fs.rmdirSync('backend-mate/pantallas'); } catch(e){}
try { fs.rmdirSync('backend-mate/js'); } catch(e){}

console.log("Done successfully.");
