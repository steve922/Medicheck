const fetch = require('node-fetch');

async function fetch510k(keywords) {
  const results = [];
  for (const keyword of keywords) {
    const url = `https://api.fda.gov/device/510k.json?search=device_name:${keyword}&limit=100`;
    try {
      const response = await fetch(url);
      if (response.status === 429) {
        console.warn('Rate limit exceeded. Waiting for 1 minute.');
        await new Promise(resolve => setTimeout(resolve, 60000));
        continue;
      }
      if (!response.ok) {
        console.error(`Error fetching data for ${keyword}: ${response.statusText}`);
        continue;
      }
      const data = await response.json();
      const records = data.results.map(item => ({
        kNumber: item.k_number,
        deviceName: item.device_name,
        decisionDate: item.decision_date,
      }));
      results.push(...records);
    } catch (error) {
      console.error(`Error fetching data for ${keyword}:`, error);
    }
  }
  return results;
}

module.exports = { fetch510k };
