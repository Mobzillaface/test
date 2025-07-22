addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  console.log(`[XSS Hit]`, {
    method: request.method,
    path: url.pathname,
    query: url.search,
    headers: Object.fromEntries(request.headers),
    ip: request.headers.get('CF-Connecting-IP'),
    userAgent: request.headers.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  return new Response('XSS Executed', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
