import React from 'react';

function Footer() {
  return (
    <footer className="text-center py-4 bg-light">
      <div className="container">
        <small className="d-block mb-2">© Pymes 2024</small>
        <div className="d-flex justify-content-center align-items-center">
          <a href="tel:113" className="text-dark mx-3">
            <i className="fas fa-phone-alt"></i> 0810-888-1234
          </a>
          <div className="mx-3">-</div>
          <div className="d-flex">
            <a className="text-dark mx-2" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="text-dark mx-2" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="text-dark mx-2" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="text-dark mx-2" href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
