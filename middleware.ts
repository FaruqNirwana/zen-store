import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/products(.*)",
  "/all-products(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Public route -> ga usah redirect
  if (isPublicRoute(req)) return;

  const { userId } = await auth();

  // Private route -> redirect jika belum login
  if (!userId) {
    return (await auth()).redirectToSignIn();
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
