

export async function sendMessageToAPI(message) {
  try {
    const api=process.env.NEXT_PUBLIC_CHAT_API
    console.log(api)
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }), 
    });

    if (!res.ok) {
      throw new Error("Erreur dans la réponse de l'API");
    }

    const data = await res.json(); 
    return data;
  } catch (err) {
    console.error("Erreur API :", err);
    return { answer: "Erreur de communication avec le serveur.", sources: [] };
  }
}
