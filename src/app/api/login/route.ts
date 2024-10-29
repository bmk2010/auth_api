import path from "path";
import { checkToken } from "../helper";
import fs from "fs/promises";

export async function POST(req: Request) {
  try {
    const { name, password } = await req.json();
    if (!name || !password) {
      return new Response(
        JSON.stringify({ error: "API bu ma'lumotlarni kutmaydi !" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const databasePath = path.join(process.cwd(), "public", "data.json");
    const fileContents = await fs.readFile(databasePath, "utf-8");
    const data = JSON.parse(fileContents);

    const adminToken: string = req.headers.get("Authorization") || "";

    if (!checkToken(adminToken, data)) {
      return new Response(JSON.stringify({ error: "token xato" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // const existUser = { name, password, fullInfo };

    const fillteredUser = data.users.filter(
        (user: { name: string; password: string }) =>
          user.name === name && user.password === password
      )[0];

      const token = fillteredUser.token

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error: "Xatolik bor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
