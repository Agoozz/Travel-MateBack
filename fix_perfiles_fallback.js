const fs = require('fs');
let content = fs.readFileSync('frontend/js/perfiles.js', 'utf8');

// 1. Convert the rendering logic into a reusable function
content = content.replace('perfiles.forEach((p) => {', 'function renderProfiles(perfilesList) {\n    cardsContainer.innerHTML = "";\n    perfilesList.forEach((p) => {');

// 2. Close the function and call it
content = content.replace('cardsContainer.appendChild(paginationDiv);\n\n    // Avisamos a dashboard.js que ya puede inicializarse\n    document.dispatchEvent(new CustomEvent("perfilesListos"));', 'cardsContainer.appendChild(paginationDiv);\n    }\n\n    renderProfiles(perfiles);\n    document.dispatchEvent(new CustomEvent("perfilesListos"));');

// 3. Add the fallback logic
const fallbackLogic = `console.warn("Backend offline. Usando perfiles mock.");
    const mockPerfiles = [
      { _id: "m1", nombre: "Nico", edad: 29, ubicacion: "Buenos Aires", estiloViaje: "mochilero", bio: "Amante de la naturaleza.", destino: "Patagonia", fechaInicio: "2024-11-01", fechaFin: "2024-11-15", presupuesto: "economico", intereses: ["Trekking"], idiomas: ["Español"], avatar: "images/avatar3.jpg", afinidad: 90 },
      { _id: "m2", nombre: "Sofía", edad: 25, ubicacion: "Córdoba", estiloViaje: "confort", bio: "Busco comodidad.", destino: "Mendoza", fechaInicio: "2024-12-05", fechaFin: "2024-12-20", presupuesto: "medio", intereses: ["Vino"], idiomas: ["Español"], avatar: "images/avatar2.jpg", afinidad: 85 }
    ];
    renderProfiles(mockPerfiles);
    document.dispatchEvent(new CustomEvent("perfilesListos"));`;

content = content.replace('cardsContainer.innerHTML = `<p class="text-danger">No se pudieron cargar los perfiles. ¿Está corriendo el servidor?</p>`;', fallbackLogic);

fs.writeFileSync('frontend/js/perfiles.js', content, 'utf8');
console.log('Fallback applied to perfiles.js');
