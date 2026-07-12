import { regions } from '../../data/provincesByRegion';

export default function ResultStep({ answers, onComplete }) {
  const recommendations = {
    noa: {
      aventurero: "Jujuy (Salinas Grandes y senderos de altura en Purmamarca y Tilcara).",
      confort: "Salta (Cafayate, bodegas de altura y hoteles coloniales premium con spa).",
      social: "Salta Capital (Peñas folclóricas de la calle Balcarce y peatonales activas).",
      cultural: "Tucumán (Ruinas de Quilmes) y La Rioja (Parque Nacional Talampaya).",
    },
    nea: {
      aventurero: "Chaco (El Impenetrable) y Formosa (Bañado La Estrella en lancha de aventura).",
      confort: "Misiones (Cataratas del Iguazú y resorts ecológicos premium de selva).",
      social: "Corrientes (Esteros del Iberá, playas fluviales y costanera con fiesta).",
      cultural: "Misiones (Ruinas Jesuíticas de San Ignacio Miní, patrimonio mundial).",
    },
    cuyo: {
      aventurero: "Mendoza (Alta Montaña, senderismo al pie del Aconcagua y rafting en Potrerillos).",
      confort: "Mendoza (Bodegas exclusivas en Valle de Uco y hoteles boutique de viñedos).",
      social: "San Luis (Potrero de los Funes y deportes grupales en el lago).",
      cultural: "San Juan (Parque Provincial Ischigualasto / Valle de la Luna).",
    },
    pampeana: {
      aventurero: "Córdoba (Trekking en el Cerro Champaquí y acampada en Los Gigantes).",
      confort: "Buenos Aires (Hoteles premium frente al mar en Mar del Plata o estancias exclusivas).",
      social: "CABA (San Telmo y Palermo, recorridos urbanos y cervecerías artesanales).",
      cultural: "Santa Fe (Casco histórico) y Entre Ríos (Palacio San José).",
    },
    patagonia: {
      aventurero: "Río Negro (El Bolsón, caminatas al Cajón del Azul y refugios de montaña).",
      confort: "Neuquén (Villa La Angostura, cabañas premium de troncos y lagos pacíficos).",
      social: "Río Negro (Bariloche, cervecerías del Circuito Chico y hostels activos).",
      cultural: "Chubut (Avistaje de ballenas en Puerto Madryn y museos galeses en Gaiman).",
    },
  };

  const profiles = {
    aventurero: {
      title: "Aventurero Indómito",
      desc: "Sos un explorador nato. Te motivan los desafíos físicos, la conexión profunda con la naturaleza salvaje y el trekking.",
    },
    confort: {
      title: "Buscador de Confort y Relax",
      desc: "Para vos, viajar es sinónimo de descansar, mimarte y recargar energías en entornos cómodos y placenteros.",
    },
    social: {
      title: "Explorador Social",
      desc: "Buscás conectar con la gente, la música y la noche de cada lugar. Disfrutás compartir un fogón y hacer amigos.",
    },
    cultural: {
      title: "Explorador Cultural e Histórico",
      desc: "Te apasiona la historia local, las leyendas, la arquitectura colonial y los museos. Buscás viajes enriquecedores.",
    }
  };

  const calculateResult = () => {
    let aventurero = 0;
    let confort = 0;
    let social = 0;
    let cultural = 0;

    if (answers.tipoViaje === "mochilero") { aventurero += 3; social += 1.5; } 
    else if (answers.tipoViaje === "confort") { confort += 3; cultural += 1; } 
    else if (answers.tipoViaje === "cultural") { cultural += 3; confort += 1.5; }
    else if (answers.tipoViaje === "social") { social += 3; aventurero += 1.5; }

    if (answers.presupuesto === "economico") { aventurero += 2; social += 1; } 
    else if (answers.presupuesto === "medio") { social += 2; cultural += 1.5; } 
    else if (answers.presupuesto === "premium") { confort += 3; cultural += 1; }

    if (answers.companero === "aventura") { aventurero += 3; social += 0.5; } 
    else if (answers.companero === "fiesta") { social += 3; } 
    else if (answers.companero === "confort") { confort += 2; cultural += 3; }

    const maxScore = Math.max(aventurero, confort, social, cultural);
    let selectedProfile = "aventurero";
    if (maxScore === confort) selectedProfile = "confort";
    else if (maxScore === social) selectedProfile = "social";
    else if (maxScore === cultural) selectedProfile = "cultural";
    
    return selectedProfile;
  };

  const selectedProfileKey = calculateResult();
  const profile = profiles[selectedProfileKey];
  const regionLabel = regions.find(r => r.id === answers.region)?.label || "";
  const recommendation = recommendations[answers.region]?.[selectedProfileKey] || "Explorar la zona seleccionada.";

  return (
    <div className="text-center fade-in">
      <div className="mb-4">
        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill mb-3">
          ¡Test Completado!
        </span>
        <h3 className="fw-bold text-success mb-2">{profile.title}</h3>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>{profile.desc}</p>
      </div>

      <div className="card border-0 bg-light rounded-4 p-4 text-start mx-auto mb-4" style={{ maxWidth: "600px" }}>
        <p className="mb-1">Destino elegido: <strong>{answers.destino || "Sin definir"}</strong></p>
        <p className="mb-3">Región: <strong>{regionLabel}</strong></p>
        
        <p className="mb-1">Basado en tu perfil de <strong>{profile.title}</strong>, también te recomendamos explorar:</p>
        <p className="mb-0 text-success fw-semibold"><strong>{recommendation}</strong></p>
      </div>

      <button className="btn btn-success rounded-pill fw-bold px-4 py-2" onClick={() => onComplete(selectedProfileKey, profile.title)}>
        Aplicar a mi Perfil
      </button>
    </div>
  );
}
