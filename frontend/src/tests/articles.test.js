process.env.ARTICLES_FILE = "public/articles.json";

import handler from "../pages/api/articles";
import httpMocks from "node-mocks-http";


describe("/api/articles API Route", () => {
  it("devrait renvoyer la liste complète des articles", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      query: {}
    });
    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("devrait filtrer les articles avec query", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      query: { query: "React" }
    });
    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.every(a => a.title.includes("React") || a.summary.includes("React"))).toBe(true);
  });

  it("devrait trier les articles par date ascendante", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      query: { sort: "asc" }
    });
    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    for (let i = 1; i < data.length; i++) {
      expect(new Date(data[i].date) >= new Date(data[i - 1].date)).toBe(true);
    }
  });
});
