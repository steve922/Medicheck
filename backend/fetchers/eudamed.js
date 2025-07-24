const https = require('https');
const csv = require('csv-parser');

async function fetchEudamed() {
  const url = 'https://ec.europa.eu/tools/eudamed/api/devices/export?exportType=csv'; // This is a placeholder URL
  const results = [];

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download CSV: ${res.statusCode}`));
      }
      res
        .pipe(csv())
        .on('data', (data) => {
          if (data.name?.toLowerCase().includes('skin') || data.name?.toLowerCase().includes('imaging')) {
            results.push({
              name: data.name,
              udi: data.udi,
              certDate: data.cert_date,
            });
          }
        })
        .on('end', () => {
          resolve(results);
        });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = { fetchEudamed };
