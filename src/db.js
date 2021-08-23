// Use JSON file for storage
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

export async function readDb() {
  await db.read();

  if (!db.data.products) {
    db.data.products = [];
  }

  if (!db.data.sessions) {
    db.data.sessions = [];
  }

  return db.data;
}

export { db };
