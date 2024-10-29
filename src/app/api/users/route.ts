import path from "path";
import fs from "fs/promises";
import { checkToken } from "../helper";


export async function GET(req: Request) {
    try {
      const adminToken: string = req.headers.get("Authorization") || "";
      const database = path.join(process.cwd(), "public", "data.json");
      const res = await fs.readFile(database, "utf-8");
      const data = JSON.parse(res);
  
      if (!checkToken(adminToken, data)) {
        return new Response(JSON.stringify({ error: "token xato" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
  
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  