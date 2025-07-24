export async function onRequest(context) {
  const { request, env, params } = context;
  const cacheTTL = parseInt(env.CACHE_TTL || '60', 10);
  const userAgents = JSON.parse(env.USER_AGENTS_JSON || '[]');
  const extraHeaders = JSON.parse(env.HEADERS_JSON || '{}');
  const targetBase = env.PROXY_TARGET || '';

  const url = new URL(targetBase);
  url.pathname = `/${params.path || ''}`;
  url.search = new URL(request.url).search;

  const headers = new Headers(request.headers);
  for (const [key, value] of Object.entries(extraHeaders)) {
    headers.set(key, value);
  }
  if (userAgents.length) {
    const ua = userAgents[Math.floor(Math.random() * userAgents.length)];
    headers.set('User-Agent', ua);
  }

  const res = await fetch(url.toString(), {
    method: request.method,
    headers,
    body: request.body,
  });

  const response = new Response(res.body, res);
  if (cacheTTL > 0) {
    response.headers.set('Cache-Control', `public, max-age=${cacheTTL}`);
  }
  return response;
}
