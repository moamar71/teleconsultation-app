// teleconsultation-app/src/components/Navbar.js
import React from "react";
import { Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar({ role, onLogout }) {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">
        Teleconsultation
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {role === "Admin" && (
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          )}
          {role === "Doctor" && (
            <Nav.Link as={Link} to="/doctor-dashboard">
              Doctor Dashboard
            </Nav.Link>
          )}
          {role === "Patient" && (
            <Nav.Link as={Link} to="/patient-profile">
              Profile
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          <Button variant="outline-light" onClick={onLogout}>
            Logout
          </Button>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;