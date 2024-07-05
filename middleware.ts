import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/"])

export default clerkMiddleware((auth, req, res) => {
  const { userId, orgId } = auth()
  
  if(isPublicRoute(req) && !userId) {
    return
  }


  if(userId && isPublicRoute(req)) {
    let path = "/select-org"

    if(orgId) {
      path = `/organization/${orgId}`
    }

    const orgSelection = new URL(path, req.url)
    return NextResponse.redirect(orgSelection)
  }

  if(userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    const orgSelection = new URL("/select-org", req.url)
    return NextResponse.redirect(orgSelection)
  }

  auth().protect() 
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};