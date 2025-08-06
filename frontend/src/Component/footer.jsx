import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Make sure this is installed

const Footer = () => {
  return (
    <footer className="footer-bg text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* About Us */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="fw-bold text-uppercase">About Us</h5>
            <p className="text-light">
              We are committed to delivering the best services to our customers with quality and integrity.
            </p>
          </div>

          {/* Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="fw-bold text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none hover-link">Home</a></li>
              <li><a href="#" className="text-light text-decoration-none hover-link">Services</a></li>
              <li><a href="#" className="text-light text-decoration-none hover-link">Contact</a></li>
              <li><a href="#" className="text-light text-decoration-none hover-link">About</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold text-uppercase">Contact</h5>
            <ul className="list-unstyled text-light">
              <li><i className="bi bi-envelope me-2"></i>info@example.com</li>
              <li><i className="bi bi-telephone me-2"></i>+92 300 1234567</li>
              <li><i className="bi bi-geo-alt me-2"></i>Lahore, Pakistan</li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold text-uppercase">Follow Us</h5>
            <div>
              <a href="#" className="text-light d-block mb-2 hover-link"><i className="bi bi-facebook me-2"></i>Facebook</a>
              <a href="#" className="text-light d-block mb-2 hover-link"><i className="bi bi-twitter me-2"></i>Twitter</a>
              <a href="#" className="text-light d-block hover-link"><i className="bi bi-instagram me-2"></i>Instagram</a>
            </div>
          </div>

        </div>

        <hr className="border-top border-light" />

        <div className="text-center text-light">
          © 2025 <strong>YourCompany</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
