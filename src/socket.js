const socket = new WebSocket(
  process.env.NODE_ENV === "production"
    ? "wss://teleconsultation-backend.onrender.com"
    : "ws://localhost:10000"
);

socket.onclose = () => {
  console.log("WebSocket disconnected, attempting to reconnect...");
  setTimeout(() => {
    window.location.reload();
  }, 5000);
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

export default socket;