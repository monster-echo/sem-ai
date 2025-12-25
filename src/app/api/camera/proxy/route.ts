import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    // Fetch the stream from the insecure source
    const response = await fetch(url, {
      // Optional: Set a timeout or signal if needed
    });

    if (!response.ok) {
      return new NextResponse(
        `Failed to fetch camera stream: ${response.statusText}`,
        { status: response.status }
      );
    }

    // Forward the Content-Type header (crucial for MJPEG)
    const contentType = response.headers.get("Content-Type");

    const headers = new Headers();
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    // Disable caching for live streams
    headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");

    // Return the stream
    return new NextResponse(response.body, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
