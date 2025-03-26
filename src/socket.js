const ws = new WebSocket(
  process.env.NODE_ENV === "production"
    ? "wss://teleconsultation-backend.onrender.com"
    : "ws://localhost:10000"
);

export default ws;