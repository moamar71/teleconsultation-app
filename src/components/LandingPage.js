// src/components/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Bienvenue sur TeleConsultation</h1>
      <p>Consultations à distance pour les cas simples afin de réduire la pression sur les urgences.</p>
      <button className="btn-primary" onClick={() => navigate("/admin-login")}>
        Connexion Admin
      </button>
    </div>
  );
}

export default LandingPage;