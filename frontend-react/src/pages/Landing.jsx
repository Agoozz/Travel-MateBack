import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Destinations from '../components/landing/Destinations';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';
import './Landing.css';

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Destinations />
      <Testimonials />
      <FAQ />
      <Footer />

      {/* Modals placed here so they are available globally on the landing page */}
      {/* Terms Modal */}
      <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content rounded-4 border-0 shadow-lg">
            <div className="modal-header border-0 bg-body-tertiary">
              <h5 className="modal-title fw-bold text-body-emphasis" id="termsModalLabel">Términos y Condiciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4 text-body-secondary">
              <h6 className="fw-bold text-body-emphasis">1. Reglas claras conservan amistades</h6>
              <p>Esta app es para hacer match y viajar con buena onda. No se permite el acoso, las estafas ni el spam. Portate bien, respetá al resto, o te damos de baja la cuenta sin aviso.</p>
              
              <h6 className="fw-bold text-body-emphasis">2. Tu responsabilidad</h6>
              <p>Nosotros te conectamos con otros viajeros, pero no somos tu niñera. Si arreglás un viaje con alguien, asegurate de tomar precauciones, juntarse primero en un lugar público y avisarle a algún familiar o amigue adónde y con quién vas.</p>

              <h6 className="fw-bold text-body-emphasis">3. La plata y los gastos</h6>
              <p>El arreglo de cómo dividen los gastos es 100% entre ustedes. Mate & Travel no se hace cargo si tu compañere resulta ser un ratón y no quiere poner para la nafta.</p>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-success rounded-pill px-4" data-bs-dismiss="modal">De una, acepto</button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Modal */}
      <div className="modal fade" id="privacyModal" tabIndex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content rounded-4 border-0 shadow-lg">
            <div className="modal-header border-0 bg-body-tertiary">
              <h5 className="modal-title fw-bold text-body-emphasis" id="privacyModalLabel">Políticas de Privacidad</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4 text-body-secondary">
              <h6 className="fw-bold text-body-emphasis">1. ¿Qué datos guardamos?</h6>
              <p>Guardamos tu nombre, tu mail, tu foto de perfil y tus resultados del test de viajero (onda si sos más de la carpa y el fideo o del hotel con spa). Todo esto para buscarte el mejor match posible.</p>
              
              <h6 className="fw-bold text-body-emphasis">2. No vendemos tus datos</h6>
              <p>Quedate tranqui, no andamos pasándole tu info a empresas raras para que te llamen a la hora de la siesta ofreciéndote planes de celular. Tus datos quedan acá, seguritos en nuestra base.</p>

              <h6 className="fw-bold text-body-emphasis">3. Los chats son tuyos</h6>
              <p>Tus conversaciones privadas quedan entre vos y la otra persona. Solo metemos las narices si hay alguna denuncia grave por seguridad.</p>

              <h6 className="fw-bold text-body-emphasis">4. ¿Te querés ir?</h6>
              <p>Si un día te cansás de la app o ya encontraste a tu grupo ideal, podés borrar tu cuenta y todo tu historial se esfuma para siempre. Sin rencores.</p>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-success rounded-pill px-4" data-bs-dismiss="modal">Me parece joya</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
