import React from "react";
import { Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/admin-login");
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">
        Teleconsultation
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {user.role ? (
            <>
              <Nav.Link as={Link} to="/admin-dashboard">
                Dashboard
              </Nav.Link>
              <Button variant="outline-light" onClick={handleLogout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <Nav.Link as={Link} to="/admin-login">
              Connexion Admin
            </Nav.Link>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;