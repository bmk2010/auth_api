import generateToken, { checkToken } from "../helper";
import path from "path";
import fs from "fs/promises";

export async function POST(req: Request) {
  try {
    const { name, password, fullInfo } = await req.json();
    if (!name || !password) {
      return new Response(
        JSON.stringify({ error: "API bu ma'lumotlarni kutmaydi !" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = generateToken(name);
    const databasePath = path.join(process.cwd(), "public", "data.json");
    const fileContents = await fs.readFile(databasePath, "utf-8");
    const data = JSON.parse(fileContents);

    const newUser = { name, password, fullInfo };
    const pushUser = { name, password, fullInfo, token };

    const adminToken: string = req.headers.get("Authorization") || "";

    if (!checkToken(adminToken, data)) {
      return new Response(JSON.stringify({ error: "token xato" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isUserExist = data.users.some(
      (user: { name: string }) => user.name === name
    );
    if (isUserExist) {
      return new Response(
        JSON.stringify({
          error: `Qo'shilmadi. ${name} ismi allaqachon mavjud`,
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    data.users.push(pushUser);
    await fs.writeFile(databasePath, JSON.stringify(data, null, 2), "utf8");

    return new Response(JSON.stringify(newUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error: "Failed to add data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
