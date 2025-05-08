import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('authToken')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}
export const config = {
  matcher: ['/signin/result'],
};