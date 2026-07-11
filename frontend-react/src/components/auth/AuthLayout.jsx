import { Link } from 'react-router-dom';
import loginLeft from '../../assets/login_left.png';
import loginRight from '../../assets/login_right.png';
import '../../pages/Auth.css';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="container-fluid min-vh-100 p-0 overflow-hidden position-relative">
      {/* Floating Theme Toggle (Optional, can be kept from Vanilla or skipped if App.jsx handles it globally) */}
      
      <div className="row g-0 min-vh-100">
        {/* Left Image Column */}
        <div className="col-lg-4 d-none d-lg-block position-relative">
          <img
            src={loginLeft}
            alt="Backpackers"
            className="position-absolute w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute w-100 h-100 bg-dark opacity-25"></div>
        </div>

        {/* Center Form Column */}
        <div className="col-lg-4 col-md-8 mx-auto d-flex align-items-center bg-body px-4 py-5 shadow-lg z-1">
          <div className="w-100 mx-auto col-xl-10">
            {/* Brand Logo */}
            <div className="text-center mb-4">
              <Link className="d-flex align-items-center justify-content-center text-decoration-none fs-3 fw-bold" to="/">
                <span className="text-success">Mate</span>
                <span className="text-info">&nbsp;&amp;&nbsp;</span>
                <span className="text-primary">Travel</span>
              </Link>
            </div>

            {/* Title & Subtitle */}
            <h2 className="fw-bold text-body-emphasis text-center mb-1">
              {title}
            </h2>
            <p className="text-body-secondary small text-center mb-4 lh-sm">
              {subtitle}
            </p>

            {/* Forms Container */}
            <div id="authFormsContainer">
              {children}
            </div>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="col-lg-4 d-none d-lg-block position-relative">
          <img
            src={loginRight}
            alt="Adventurer"
            className="position-absolute w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute w-100 h-100 bg-dark opacity-25"></div>
        </div>
      </div>
    </div>
  );
}
