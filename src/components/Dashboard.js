import React, { useEffect } from "react";
import { Container } from "react-bootstrap"; // إزالة 'Button'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      toast.error("Veuillez vous connecter en tant qu'admin");
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <Container className="mt-5">
      <h2>Tableau de bord Admin</h2>
      <p>Bienvenue dans le tableau de bord de l'administrateur.</p>
    </Container>
  );
};

export default Dashboard;