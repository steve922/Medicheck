export async function onRequest(context) {
  const { PASSWORD = '', ADMINPASSWORD = '' } = context.env;
  const hash = async (str) => {
    const data = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
  const hashedPass = await hash(PASSWORD);
  const hashedAdmin = await hash(ADMINPASSWORD);

  const response = await context.next();
  const contentType = response.headers.get('Content-Type') || '';
  if (contentType.includes('text/html')) {
    const text = await response.text();
    const injected = text
      .replace('__PASSWORD__', hashedPass)
      .replace('__ADMINPASSWORD__', hashedAdmin);
    return new Response(injected, response);
  }
  return response;
}
