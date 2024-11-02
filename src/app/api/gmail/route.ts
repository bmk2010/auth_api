import { NextRequest, NextResponse } from "next/server";
import dns from "dns";

// DNS resolveMx funksiyasini Promise asosida ishlatish uchun promisify qilamiz
const resolveMx = (domain: string): Promise<dns.MxRecord[]> => {
  return new Promise((resolve, reject) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err) {
        reject(err);
      } else {
        resolve(addresses);
      }
    });
  });
};

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  const domain = email.split("@")[1];

  try {
    const addresses = await resolveMx(domain);
    if (addresses && addresses.length > 0) {
      return NextResponse.json({ valid: true, message: "Valid email domain" });
    } else {
      return NextResponse.json({
        valid: false,
        message: "Invalid email domain",
      });
    }
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({
      valid: false,
      message: "Error resolving domain",
    });
  }
}
