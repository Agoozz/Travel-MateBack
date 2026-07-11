import avatar1 from '../../assets/avatar1.jpg';
import avatar2 from '../../assets/avatar2.jpg';
import avatar3 from '../../assets/avatar3.jpg';
import lago from '../../assets/lago.jpg';
import vinedo from '../../assets/vinedo.jpg';
import ciudad from '../../assets/ciudad.jpg';
import catedral from '../../assets/catedral.jpg';
import norte from '../../assets/norte.jpg';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <header className="py-4 py-lg-5">
      <div className="container-fluid px-lg-5">
        <div className="row align-items-center g-4">
          
          {/* Left Column (Content) */}
          <div className="col-lg-7 px-lg-4">
            <div className="ps-lg-3">
              <h1 className="display-5 fw-bold mb-3 lh-sm text-body-emphasis">
                Encontrá tu compañere ideal <span className="text-success">de viaje</span>
              </h1>
              <p className="text-body-secondary mb-4 fs-5 lh-base">
                Conectamos viajeros con intereses compatibles para que vivas experiencias inolvidables.
              </p>
              
              {/* CTA Buttons */}
              <div className="d-flex flex-wrap gap-2 gap-sm-3 mb-5">
                <Link to="/register" className="btn btn-success rounded-pill px-4 py-2 fw-semibold shadow-sm">Comenzar test</Link>
                <a href="#como-funciona" className="btn btn-outline-success border-2 rounded-pill px-4 py-2 fw-semibold text-decoration-none">Cómo funciona</a>
              </div>
              
              {/* Social Proof */}
              <div className="d-flex align-items-center gap-3 mt-4">
                <div className="d-flex align-items-center">
                  <img src={avatar1} alt="Avatar 1" width="38" height="38" className="rounded-circle border border-2 border-white" />
                  <img src={avatar2} alt="Avatar 2" width="38" height="38" className="rounded-circle border border-2 border-white" />
                  <img src={avatar3} alt="Avatar 3" width="38" height="38" className="rounded-circle border border-2 border-white" />
                </div>
                <span className="text-body-secondary small fw-semibold">
                  +10000 viajeros encontraron su viaje ideal
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Column (Carousel) */}
          <div className="col-lg-5 position-relative overflow-hidden px-lg-0">
            <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
              </div>
              
              {/* Carousel Items */}
              <div className="carousel-inner rounded-4 shadow-sm">
                <div className="carousel-item active">
                  <img src={lago} alt="Lago" className="d-block w-100 object-fit-cover hero-carousel-img" />
                </div>
                <div className="carousel-item">
                  <img src={vinedo} alt="Viñedo" className="d-block w-100 object-fit-cover hero-carousel-img" />
                </div>
                <div className="carousel-item">
                  <img src={ciudad} alt="Ciudad" className="d-block w-100 object-fit-cover hero-carousel-img" />
                </div>
                <div className="carousel-item">
                  <img src={catedral} alt="Catedral" className="d-block w-100 object-fit-cover hero-carousel-img" />
                </div>
                <div className="carousel-item">
                  <img src={norte} alt="Norte" className="d-block w-100 object-fit-cover hero-carousel-img" />
                </div>
              </div>
              
              {/* Carousel Controls */}
              <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
}
