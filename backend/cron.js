const cron = require('node-cron');
const { fetch510k } = require('./fetchers/openfda');
const { fetchEudamed } = require('./fetchers/eudamed');
const { fetchNmpa } = require('./fetchers/nmpa');
const { insertOrReplaceCompetitor, insertEvent } = require('./db');

async function refreshAll() {
  console.log('Starting daily refresh...');
  try {
    // FDA
    const keywords = ['Visia', 'PSI', 'PIE', 'ISEMECO', 'OBSERV'];
    const fdaData = await fetch510k(keywords);
    fdaData.forEach(item => {
      insertOrReplaceCompetitor.run('US', item.deviceName, item.kNumber, item.decisionDate);
    });
    insertEvent.run('US', 'fetch', `${fdaData.length} new 510(k) records found.`, new Date().toISOString());
    console.log('FDA data refreshed.');

    // EUDAMED
    const eudamedData = await fetchEudamed();
    eudamedData.forEach(item => {
      insertOrReplaceCompetitor.run('EU', item.name, item.udi, item.certDate);
    });
    insertEvent.run('EU', 'fetch', `${eudamedData.length} new EUDAMED records found.`, new Date().toISOString());
    console.log('EUDAMED data refreshed.');

    // NMPA
    const nmpaData = await fetchNmpa();
    nmpaData.forEach(item => {
      insertEvent.run('CN', 'announcement', item.title, item.date);
    });
    console.log('NMPA data refreshed.');

    console.log('Daily refresh completed.');
  } catch (error) {
    console.error('Error during daily refresh:', error);
  }
}

// Schedule to run every day at midnight
cron.schedule('0 0 * * *', refreshAll);

module.exports = { refreshAll };
