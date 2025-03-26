import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import socket from "../socket";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://teleconsultation-backend.onrender.com/api"
    : "http://localhost:10000/api";

function AdminLoginPage({ tokenKey, roleKey, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    socket.onopen = () => {
      console.log("WebSocket connected");
    };
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.onopen = null;
      socket.onerror = null;
      socket.onclose = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Sending request to:", `${API_URL}/admin-login`);
      const response = await axios.post(
        `${API_URL}/admin-login`,
        { username, password },
        { timeout: 60000 }
      );
      const { token, role, userId } = response.data;
      localStorage.setItem(tokenKey, token);
      localStorage.setItem(roleKey, role);
      localStorage.setItem("userId", userId);
      toast.success("Connexion réussie !");

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(`Admin ${username} logged in`);
      } else {
        console.warn("WebSocket is not connected");
      }

      onLoginSuccess({ role, userId });
    } catch (err) {
      console.error("Error during login:", err);
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