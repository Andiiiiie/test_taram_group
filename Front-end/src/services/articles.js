import { readFile } from "fs/promises";
import { join } from "path";


export async function getArticles() {
    const filePath = join(process.cwd(), process.env.ARTICLES_FILE);
    const jsonData = await readFile(filePath, "utf-8");
    const articles = JSON.parse(jsonData);
    return articles;
}
