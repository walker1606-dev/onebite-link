import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

function isProtectedPath(pathname: string): boolean {
  return pathname === "/" || pathname === "/new" || pathname.startsWith("/folder/");
}

export async function middleware(request: NextRequest) {
  const { response, user } = await createClient(request);

  if (isProtectedPath(request.nextUrl.pathname) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
