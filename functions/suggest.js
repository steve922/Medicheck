export async function onRequestPost(context) {
  const { request, env } = context;
  const { riskOrigin, breakdown } = await request.json();

  const prompt = `Given the following risk assessment for a medical device, provide a one-sentence suggestion for next steps. Risk origin: ${riskOrigin}. Breakdown: ${JSON.stringify(breakdown)}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
    }),
  });

  const data = await response.json();
  const suggestion = data.choices[0].message.content.trim();

  return new Response(JSON.stringify({ suggestion }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
