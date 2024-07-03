import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./src/lib/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard/write");

  if (isOnDashboard) {
    if (!user) return NextResponse.redirect(new URL("/login", request.nextUrl));
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
