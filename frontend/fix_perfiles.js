const fs = require('fs');

// 1. Fix auth.js API
let authJs = fs.readFileSync('frontend/js/auth.js', 'utf8');
authJs = authJs.replace('const API = "/api/usuarios";', 'const API = "http://localhost:3000/api/usuarios";');
fs.writeFileSync('frontend/js/auth.js', authJs, 'utf8');

// 2. Fix perfiles.js layout and add pagination
let perfilesJs = fs.readFileSync('frontend/js/perfiles.js', 'utf8');

// Add p-4 to card-body
perfilesJs = perfilesJs.replace('<div class="card-body p-0">', '<div class="card-body p-4">');

// Add padding and styling to image
perfilesJs = perfilesJs.replace('<img src="${p.avatar}" alt="${p.nombre}">', '<img src="${p.avatar}" alt="${p.nombre}" class="rounded-circle object-fit-cover shadow-sm border border-2 border-white" style="width: 100px; height: 100px; object-fit: cover;">');

// Add pagination
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

perfilesJs = perfilesJs.replace('// Avisamos a dashboard.js', paginationHtml + '\n    // Avisamos a dashboard.js');

fs.writeFileSync('frontend/js/perfiles.js', perfilesJs, 'utf8');
console.log('Fixed perfiles.js and auth.js');
