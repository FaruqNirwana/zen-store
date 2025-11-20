import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/products(.*)",
  "/all-products(.*)",
  "/api/inngest(.*)", // Allow Inngest webhook endpoint
]);

export default clerkMiddleware(async (auth, req) => {
  // Public route -> lewati saja
  if (isPublicRoute(req)) return;

  const { userId, redirectToSignIn } = await auth();

  // Jika belum login, redirect ke sign-in
  if (!userId) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Lindungi semua route kecuali assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // Lindungi API route
    "/(api|trpc)(.*)",
  ],
};

