import { getArticles } from "../../services/articles";


import { z } from "zod";

function normalizeText(str) {
  return str
    .normalize("NFD")           // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .toLowerCase();
}

// Schéma pour valider les query params
const querySchema = z.object({
  query: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional()
});

export default async function handler(req, res) {
  try {
    // Valider les query params
    const result = querySchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({ error: "Paramètres invalides" });
    }

    const { query = "", sort = "desc" } = result.data;

    let articles = await getArticles();

    // Filtrage plein texte
    if (query) {
      const lowerQuery = normalizeText(query);
      articles = articles.filter(
        (a) =>
          normalizeText(a.title).includes(lowerQuery) ||
          normalizeText(a.summary).includes(lowerQuery)
      );
    }

    // Tri par date
    articles.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sort === "asc" ? dateA - dateB : dateB - dateA;
    });

    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de charger les articles" });
  }
}
