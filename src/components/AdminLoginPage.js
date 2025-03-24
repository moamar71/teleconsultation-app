// teleconsultation-app/src/components/AdminLoginPage.js
import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

function AdminLoginPage({ apiUrl, tokenKey, roleKey, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/admin-login`,
        { username, password },
        { timeout: 60000 } // زيادة المهلة إلى 60 ثانية
      );
      const { token, role, userId } = response.data;
      localStorage.setItem(tokenKey, token);
      localStorage.setItem(roleKey, role);
      localStorage.setItem("userId", userId);
      toast.success("Login successful!");
      onLoginSuccess({ role, userId });
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion");
      toast.error("Erreur de connexion");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Connexion Admin</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Se connecter
        </Button>
      </Form>
    </Container>
  );
}

export default AdminLoginPage;