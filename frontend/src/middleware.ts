import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ==========================================
  // Skip Static Files
  // ==========================================
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/uploads") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|map|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  console.log(
    `[Middleware] ${request.method} ${pathname}`
  );

  // ==========================================
  // Maintenance Mode
  // ==========================================
  const maintenanceMode = false;

  if (
    maintenanceMode &&
    pathname !== "/maintenance"
  ) {
    return NextResponse.redirect(
      new URL("/maintenance", request.url)
    );
  }

  // ==========================================
  // Redirect Old URLs
  // ==========================================
  if (pathname === "/dashboard") {
    return NextResponse.redirect(
      new URL("/farmer/dashboard", request.url)
    );
  }

  if (pathname === "/home") {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // ==========================================
  // Block Sensitive Paths
  // ==========================================
  const blockedPaths = [
    "/private",
    "/config",
    "/secret",
  ];

  if (
    blockedPaths.some((path) =>
      pathname.startsWith(path)
    )
  ) {
    return new NextResponse(
      "Access Denied",
      {
        status: 403,
      }
    );
  }

  // ==========================================
  // Continue Request
  // ==========================================
  const response = NextResponse.next();

  // ==========================================
  // Custom Headers
  // ==========================================
  response.headers.set(
    "x-app-name",
    "AgroSphere"
  );

  response.headers.set(
    "x-powered-by",
    "Next.js"
  );

  // ==========================================
  // Security Headers
  // ==========================================
  response.headers.set(
    "X-Frame-Options",
    "DENY"
  );

  response.headers.set(
    "X-Content-Type-Options",
    "nosniff"
  );

  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  response.headers.set(
    "Cross-Origin-Opener-Policy",
    "same-origin"
  );

  response.headers.set(
    "Cross-Origin-Resource-Policy",
    "same-origin"
  );

  response.headers.set(
    "X-DNS-Prefetch-Control",
    "on"
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};