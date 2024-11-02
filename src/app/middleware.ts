import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware orqali CORS ni sozlash
export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Barcha so'rovlarga CORS sarlavhalarini qo'shish
  response.headers.set('Access-Control-Allow-Origin', '*'); // Barcha domenlarga ruxsat
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Agar so'rov OPTIONS bo'lsa, faqat CORS sarlavhalarini qaytaramiz
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return response;
}

// Middleware faqat `/api` route'lari uchun ishlatiladi
export const config = {
  matcher: '/api/:path*',
};
