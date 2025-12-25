import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/monitor/:path*",
    "/alarms/:path*",
    "/assets/:path*",
    "/analysis/:path*",
    "/gateway/:path*",
    "/settings/:path*",
    "/", // Protect root as well if it redirects to dashboard
  ],
};
