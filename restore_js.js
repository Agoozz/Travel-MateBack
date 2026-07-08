const { execSync } = require('child_process');
const fs = require('fs');

// 1. Restore JS files from git to backend-mate/js
const filesToRestore = [
    'auth.js', 'dashboard.js', 'mensajes.js', 'perfil.js', 'perfiles.js', 'traveler-test.js', 'main.js', 'provinces.js', 'theme.js'
];
const backendPaths = filesToRestore.map(f => `backend-mate/js/${f}`);
execSync(`git restore --source=7c85c0a ${backendPaths.join(' ')}`);

// 2. Move to frontend/js and apply replacements
for (const file of filesToRestore) {
    const oldPath = `backend-mate/js/${file}`;
    const newPath = `frontend/js/${file}`;
    
    let content = fs.readFileSync(oldPath, 'utf8');
    
    // URL adjustments
    content = content.replaceAll('../index.html', 'index.html');
    content = content.replaceAll('pantallas/iniciar_sesion.html', 'iniciar_sesion.html');
    content = content.replaceAll('pantallas/inicio.html', 'inicio.html');
    content = content.replaceAll('pantallas/perfil.html', 'perfil.html');
    content = content.replaceAll('pantallas/mensajes.html', 'mensajes.html');
    
    // Fetch adjustments
    content = content.replaceAll('fetch("/api/', 'fetch("http://localhost:3000/api/');
    content = content.replaceAll('fetch(`/api/', 'fetch(`http://localhost:3000/api/');
    content = content.replaceAll('fetch( `/api/', 'fetch( `http://localhost:3000/api/');
    
    // Auth adjustments
    content = content.replaceAll('const API = "/api/usuarios";', 'const API = "http://localhost:3000/api/usuarios";');
    
    // Specific perfiles.js adjustments (UI fixes I made)
    if (file === 'perfiles.js') {
        content = content.replace('<div class="card-body p-0">', '<div class="card-body p-4">');
        content = content.replace('<img src="${p.avatar}" alt="${p.nombre}">', '<img src="${p.avatar}" alt="${p.nombre}" class="rounded-circle object-fit-cover shadow-sm border border-2 border-white" style="width: 100px; height: 100px; object-fit: cover;">');
        
        const paginationHtml = `
      // Add pagination to the end
      const paginationDiv = document.createElement("div");
      paginationDiv.className = "d-flex justify-content-center mt-4 mb-5";
      paginationDiv.innerHTML = \`
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm">
            <li class="page-item disabled">
              <a class="page-link text-success" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
            </li>
            <li class="page-item active"><a class="page-link bg-success border-success" href="#">1</a></li>
            <li class="page-item"><a class="page-link text-success" href="#">2</a></li>
            <li class="page-item"><a class="page-link text-success" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link text-success" href="#">Siguiente</a>
            </li>
          </ul>
        </nav>
      \`;
      cardsContainer.appendChild(paginationDiv);
`;
        content = content.replace('// Avisamos a dashboard.js', paginationHtml + '\n    // Avisamos a dashboard.js');
    }
    
    fs.writeFileSync(newPath, content, 'utf8');
}
console.log('Restored all JS files flawlessly.');
