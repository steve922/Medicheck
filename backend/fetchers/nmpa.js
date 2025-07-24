const puppeteer = require('puppeteer');

async function fetchNmpa() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://english.nmpa.gov.cn/news.html'); // Placeholder for news section

  const results = await page.evaluate(() => {
    const announcements = [];
    const items = document.querySelectorAll('.news-item'); // This is a placeholder selector
    items.forEach(item => {
      const titleElement = item.querySelector('.title');
      const dateElement = item.querySelector('.date');
      const title = titleElement ? titleElement.innerText : '';
      if (title.toLowerCase().includes('skin')) {
        const link = titleElement ? titleElement.href : '';
        const date = dateElement ? dateElement.innerText : '';
        // Assuming the link is to a page that contains a PDF
        announcements.push({ title, pdf: link, date });
      }
    });
    return announcements;
  });

  await browser.close();
  return results;
}

module.exports = { fetchNmpa };
