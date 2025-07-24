import { calcRisk } from '../backend/scorer';

export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const country = searchParams.get('country') || 'US';
  const description = searchParams.get('description') || '';
  const risk = await calcRisk(country, description);
  return new Response(JSON.stringify(risk), {
    headers: { 'Content-Type': 'application/json' },
  });
}
