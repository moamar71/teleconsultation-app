// src/components/Footer.js
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <h4>Liens Utiles</h4>
          <ul>
            <li>
              <button>Contactez-nous</button>
            </li>
            <li>
              <button>À propos</button>
            </li>
          </ul>
        </div>
        <div className="footer-info">
          <h4>Informations</h4>
          <p>TeleConsultation - Consultations à distance pour les cas simples.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 TeleConsultation. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;