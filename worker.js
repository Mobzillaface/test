export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Log the request for testing purposes
    console.log("XSS payload triggered:", new Date().toISOString());
    console.log("Request method:", request.method);
    console.log("Request URL:", request.url);
    console.log("User-Agent:", request.headers.get("User-Agent"));

    // Return response with CORS headers
    return new Response("XSS request received successfully", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "text/plain",
      },
    });
  },
};
