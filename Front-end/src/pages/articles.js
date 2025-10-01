import ArticleCard from "../components/ArticleCard";
import { useEffect, useState } from "react";
import ChatWidget from "../components/ChatWidget";

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [sortAsc, setSortAsc] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          query,
          sort: sortAsc ? "asc" : "desc"
        });
        const res = await fetch(`/api/articles?${params.toString()}`);
        if (!res.ok) throw new Error("Erreur lors du chargement des articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, sortAsc]);


    return (
    <div className="container mt-5">
      <h1 className="mb-4">Liste des articles</h1>
     

      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          placeholder="Rechercher..."
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-dark"
          onClick={() => setSortAsc(!sortAsc)}
        >
          Trier par date {sortAsc ? "(plus anciens)" : "(plus récents)"}
        </button>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && articles.length === 0 && <p>Aucun article trouvé</p>}

      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}

       {/* Bouton pour ouvrir/fermer le chat */}
      <button
        className="btn btn-dark"
        onClick={() => setChatOpen(!chatOpen)}
        style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
      >
        {chatOpen ? "Fermer le chat" : "Ouvrir le chat"}
      </button>

      {/* Widget chat affiché seulement si chatOpen = true */}
      {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} />}
    </div>
  );
}
