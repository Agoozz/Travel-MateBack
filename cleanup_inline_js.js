const fs = require('fs');
const path = require('path');

const files = ['inicio.html', 'mensajes.html', 'perfil.html'];

for (const file of files) {
    const fullPath = path.join('frontend', file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove logout onclick
    content = content.replace(/onclick="localStorage\.clear\(\);\s*window\.location\.replace\('\.\.\/index\.html'\);\s*return false;"/g, '');
    
    // Remove search clear onclick
    content = content.replace(/onclick="document\.getElementById\('searchInput'\)\.value=''; document\.getElementById\('searchBtn'\)\.click\(\);"/g, 'id="btnClearSearch"');
    
    // Remove back to top onclick
    content = content.replace(/onclick="window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\)"/g, '');
    
    fs.writeFileSync(fullPath, content, 'utf8');
}

// Add logout listener to perfil.js
let perfilJs = fs.readFileSync('frontend/js/perfil.js', 'utf8');
if (!perfilJs.includes('.btn-logout-profile')) {
    perfilJs += `\ndocument.querySelectorAll('.btn-logout-profile').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    });
});\n`;
    fs.writeFileSync('frontend/js/perfil.js', perfilJs, 'utf8');
}

// Add logout listener to mensajes.js
let mensajesJs = fs.readFileSync('frontend/js/mensajes.js', 'utf8');
if (!mensajesJs.includes('.btn-logout-profile')) {
    mensajesJs += `\ndocument.querySelectorAll('.btn-logout-profile').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    });
});\n`;
    fs.writeFileSync('frontend/js/mensajes.js', mensajesJs, 'utf8');
}

// Add clear search and scroll listeners to dashboard.js
let dashboardJs = fs.readFileSync('frontend/js/dashboard.js', 'utf8');

if (!dashboardJs.includes('btnClearSearch')) {
    dashboardJs = dashboardJs.replace('if (searchInput) {', `const btnClearSearch = document.getElementById('btnClearSearch');
    if (btnClearSearch) {
        btnClearSearch.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (searchBtn) searchBtn.click();
        });
    }
    
    if (searchInput) {`);
}

if (!dashboardJs.includes('backToTopBtn.addEventListener(\'click\'')) {
    dashboardJs = dashboardJs.replace('backToTopBtn.classList.add(\'d-none\');\n                }, 300);\n            }\n        });', `backToTopBtn.classList.add('d-none');
                }, 300);
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });`);
}

fs.writeFileSync('frontend/js/dashboard.js', dashboardJs, 'utf8');

console.log("Cleanup done.");
