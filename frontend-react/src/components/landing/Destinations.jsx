import { useState } from 'react';
import misiones from '../../assets/misiones.png';
import mendoza from '../../assets/neuquen.jpg'; // Vanilla has it like this
import rio_negro from '../../assets/rio_negro.jpg';
import jujuy from '../../assets/la_rioja.png';
import salta from '../../assets/salta.jpg';
import formosa from '../../assets/la_pampa.jpg';
import tucuman from '../../assets/tucuman.jpg';
import catamarca from '../../assets/catamarca.jpg';
import santiago_del_estero from '../../assets/santiago_del_estero.jpg';
import chaco from '../../assets/chaco.jpg';
import corrientes from '../../assets/corrientes.jpg';
import la_rioja from '../../assets/santa_cruz.jpg';
import san_juan from '../../assets/san_juan.jpg';
import cordoba from '../../assets/cordoba.jpg';
import santa_fe from '../../assets/santa_fe.jpg';
import entre_rios from '../../assets/entre_rios.png';
import san_luis from '../../assets/mendoza.png';
import la_pampa from '../../assets/la_pampa.jpg';
import buenos_aires from '../../assets/buenos_aires.jpg';
import caba from '../../assets/caba.jpg';
import neuquen from '../../assets/entre_rios.png';
import chubut from '../../assets/cordoba.png';
import santa_cruz from '../../assets/santa_cruz.png';
import tierra_del_fuego from '../../assets/corrientes.png';

const provinces = [
  { name: 'Misiones', region: 'nea', featured: true, image: misiones, desc: 'Las majestuosas Cataratas del Iguazú, una de las 7 maravillas naturales, tierra colorada y selva paranaense.' },
  { name: 'Mendoza', region: 'cuyo', featured: true, image: mendoza, desc: 'La capital internacional del vino al pie del Aconcagua. Viñedos de Malbec y turismo de aventura.' },
  { name: 'Río Negro', region: 'patagonia', featured: true, image: rio_negro, desc: 'Bariloche y el lago Nahuel Huapi, chocolates artesanales, y las playas atlánticas en Las Grutas.' },
  { name: 'Jujuy', region: 'noa', featured: true, image: jujuy, desc: 'La Quebrada de Humahuaca con su Cerro de los Siete Colores, las inmensas Salinas Grandes y pueblos andinos de adobe como Tilcara y Purmamarca.' },
  { name: 'Salta', region: 'noa', featured: false, image: salta, desc: 'Arquitectura colonial, peñas folclóricas, el Tren a las Nubes, y viñedos de altura en Cafayate rodeados de hermosos valles calchaquíes.' },
  { name: 'Formosa', region: 'nea', featured: false, image: formosa, desc: 'El Bañado La Estrella ofrece un espectáculo natural inigualable con sus "champales" de vegetación acuática inundada.' },
  { name: 'Tucumán', region: 'noa', featured: false, image: tucuman, desc: 'El jardín de la República. Ruinas precolombinas de Quilmes, y Tafí del Valle rodeados de yunga verde.' },
  { name: 'Catamarca', region: 'noa', featured: false, image: catamarca, desc: 'Paisajes lunares en el Campo de Piedra Pómez, lagunas con flamencos de la puna, y la Ruta del Adobe.' },
  { name: 'Santiago del Estero', region: 'noa', featured: false, image: santiago_del_estero, desc: 'Las termas de Río Hondo con sus aguas curativas medicinales y hotelería de relax, y cuna de la chacarera.' },
  { name: 'Chaco', region: 'nea', featured: false, image: chaco, desc: 'El impenetrable chaqueño ofrece un turismo de aventura salvaje y avistaje de fauna en su selva subtropical.' },
  { name: 'Corrientes', region: 'nea', featured: false, image: corrientes, desc: 'El portal de acceso a los Esteros del Iberá, uno de los humedales más grandes y biodiversos del planeta.' },
  { name: 'La Rioja', region: 'noa', featured: false, image: la_rioja, desc: 'El Parque Nacional Talampaya con sus inmensos paredones rojizos esculpidos por el viento y el agua.' },
  { name: 'San Juan', region: 'cuyo', featured: false, image: san_juan, desc: 'El Parque Provincial Ischigualasto (Valle de la Luna) con sus fósiles de dinosaurios bajo cielos ultra limpios.' },
  { name: 'Córdoba', region: 'pampeana', featured: false, image: cordoba, desc: 'Sierras, ríos cristalinos y lagos en Punilla y Calamuchita, combinado con rica historia jesuita.' },
  { name: 'Santa Fe', region: 'pampeana', featured: false, image: santa_fe, desc: 'El delta del Paraná, paseos costeros en su capital y Rosario, cuna de la bandera nacional.' },
  { name: 'Entre Ríos', region: 'pampeana', featured: false, image: entre_rios, desc: 'Playas fluviales, termas terapéuticas en todo el territorio y carnavales llenos de brillo.' },
  { name: 'San Luis', region: 'cuyo', featured: false, image: san_luis, desc: 'Sierras puntanas con microclima excepcional en Merlo y el hermoso lago de Potrero de los Funes.' },
  { name: 'La Pampa', region: 'pampeana', featured: false, image: la_pampa, desc: 'El Parque Nacional Lihuel Calel, bosques de caldenes, y la inmensidad de la llanura pampeana de tradición gaucha.' },
  { name: 'Buenos Aires', region: 'pampeana', featured: false, image: buenos_aires, desc: 'Playas atlánticas, lagunas pampeanas e inmensa llanura ideal para escapadas de turismo rural.' },
  { name: 'Ciudad Autónoma de Buenos Aires (CABA)', region: 'pampeana', featured: false, image: caba, desc: 'El Obelisco, San Telmo, Caminito en La Boca y una vibrante oferta cultural, teatral y gastronómica.' },
  { name: 'Neuquén', region: 'patagonia', featured: false, image: neuquen, desc: 'Lagos glaciares color turquesa rodeados de bosques de araucarias, San Martín de los Andes y Villa La Angostura.' },
  { name: 'Chubut', region: 'patagonia', featured: false, image: chubut, desc: 'Ballenas francas australes en Puerto Madryn, pingüinos de Magallanes en Punta Tombo, y té en Gaiman.' },
  { name: 'Santa Cruz', region: 'patagonia', featured: false, image: santa_cruz, desc: 'El imponente Glaciar Perito Moreno en El Calafate y El Chaltén, la capital nacional del trekking.' },
  { name: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur', region: 'patagonia', featured: false, image: tierra_del_fuego, desc: 'Ushuaia, el fin del mundo. Canal de Beagle, el tren del fin del mundo y el Parque Nacional Lapataia.' },
];

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegion, setActiveRegion] = useState("destacados");

  const normalizeText = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredProvinces = provinces.filter(province => {
    const normalizedTerm = normalizeText(searchTerm.trim());
    if (normalizedTerm !== "") {
      return normalizeText(province.name).includes(normalizedTerm);
    } else {
      if (activeRegion === "destacados") {
        return province.featured;
      }
      return province.region === activeRegion;
    }
  });

  return (
    <section id="destinos" className="py-5 bg-body-tertiary border-top">
      <div className="container py-4">
        {/* Header */}
        <div className="text-center mb-5 mx-auto col-lg-8">
          <h2 className="display-5 fw-bold mb-3 text-body-emphasis">Destinos turísticos</h2>
          <p className="text-body-secondary fs-5 fw-normal mb-4">
            Explorá la belleza natural y cultural de cada rincón de Argentina.
          </p>
        </div>

        {/* Search Bar */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6 col-lg-5">
            <div className="input-group shadow-sm rounded-pill overflow-hidden bg-body border border-light">
              <span className="input-group-text bg-body border-0 ps-3">
                <i className="bi bi-search text-success"></i>
              </span>
              <input 
                type="text" 
                id="searchProvince" 
                className="form-control border-0 py-2 fs-6 shadow-none" 
                placeholder="Buscar provincia..."
                aria-label="Buscar provincia"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Region Tabs */}
        {searchTerm.trim() === "" && (
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-5" id="regionTabs">
            <button className={`btn btn-outline-success region-tab rounded-pill px-4 py-2 fw-semibold ${activeRegion === 'destacados' ? 'active' : ''}`} onClick={() => setActiveRegion('destacados')}>Destacados</button>
            <button className={`btn btn-outline-success region-tab rounded-pill px-4 py-2 fw-semibold ${activeRegion === 'noa' ? 'active' : ''}`} onClick={() => setActiveRegion('noa')}>Noroeste (NOA)</button>
            <button className={`btn btn-outline-success region-tab rounded-pill px-4 py-2 fw-semibold ${activeRegion === 'nea' ? 'active' : ''}`} onClick={() => setActiveRegion('nea')}>Noreste (NEA)</button>
            <button className={`btn btn-outline-success region-tab rounded-pill px-4 py-2 fw-semibold ${activeRegion === 'cuyo' ? 'active' : ''}`} onClick={() => setActiveRegion('cuyo')}>Cuyo</button>
            <button className={`btn btn-outline-success region-tab rounded-pill px-4 py-2 fw-semibold ${activeRegion === 'pampeana' ? 'active' : ''}`} onClick={() => setActiveRegion('pampeana')}>Pampeana</button>
            <button className={`btn btn-outline-success region-tab rounded-pill px-4 py-2 fw-semibold ${activeRegion === 'patagonia' ? 'active' : ''}`} onClick={() => setActiveRegion('patagonia')}>Patagónica</button>
          </div>
        )}

        {/* Cards Grid */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4" id="provincesGrid">
          {filteredProvinces.map((prov, index) => (
            <div key={index} className="col province-card">
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden bg-white">
                <div className="overflow-hidden">
                  <img src={prov.image} alt={prov.name} className="w-100 object-fit-cover province-cover" />
                </div>
                <div className="card-body d-flex flex-column p-3">
                  <h5 className="card-title fw-bold text-dark mb-2 fs-6">{prov.name}</h5>
                  <p className="card-text text-secondary small mb-3 flex-grow-1 lh-base">
                    {prov.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
