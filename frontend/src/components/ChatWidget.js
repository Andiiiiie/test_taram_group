import { useState } from "react";
import { sendMessageToAPI } from "../services/chat";

export default function ChatWidget({ onClose }) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message) return;

    // Ajouter la question de l'utilisateur dans l'historique
    setChatHistory((prev) => [
      ...prev,
      { message: message, answer: "", sources: null, from: "user" },
    ]);
    setLoading(true);

    // Appel API
    const data = await sendMessageToAPI(message);

    // Ajouter la réponse du bot dans l'historique
    setChatHistory((prev) => [
      ...prev,
      {
        message: message,
        answer: data.answer,
        sources: data.sources || [],
        from: "api",
      },
    ]);

    setMessage("");
    setLoading(false);
  };

  const handleClose = () => {
    setChatHistory([]);
    onClose();
  };

  return (
    <div
      className="card"
      style={{
        width: "300px",
        position: "fixed",
        bottom: "70px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white">
        Chat
        <button className="btn btn-danger btn-sm" onClick={handleClose}>
          X
        </button>
      </div>

      {/* Zone messages */}
      <div
        className="card-body"
        style={{ height: "200px", overflowY: "auto" }}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-3 text-${chat.from === "user" ? "end" : "start"}`}
          >
            {chat.from === "user" && <p><strong>Q:</strong> {chat.message}</p>}
            {chat.from === "api" && <p><strong>R:</strong> {chat.answer}</p>}

            {/* Affichage des sources */}
            {chat.from === "api" && chat.sources !== null && (
              chat.sources.length > 0 ? (
                <p className="text-muted small fst-italic mt-1">
                  Sources : {chat.sources.join(", ")}
                </p>
              ) : (
                <p className="text-warning small fst-italic mt-1">
                  ⚠️ Aucune source disponible
                </p>
              )
            )}
          </div>
        ))}

        {loading && <div>Bot est en train de répondre...</div>}
      </div>

      {/* Zone input */}
      <div className="card-footer d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Écrivez votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-dark" onClick={handleSend}>
          Envoyer
        </button>
      </div>
    </div>
  );
}
