import { getLatestEvents } from '../backend/db';

export async function onRequest(context) {
  const events = getLatestEvents();
  return new Response(JSON.stringify(events), {
    headers: { 'Content-Type': 'application/json' },
  });
}
