const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://teleconsultation-backend.onrender.com/api"
    : "http://localhost:10000/api";