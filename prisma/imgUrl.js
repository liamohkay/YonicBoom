const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');
const filePath = path.resolve(__dirname, 'artist_alias_seed.csv');
const spanRegex = /(?<=background-image: url).*?(?=class="sc-artwork)/;
const urlRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// puppeteer usage as normal


async function getImgUrl(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    const pageHTML = await page.evaluate(() => document.querySelector('*').outerHTML);
    await page.waitForTimeout(10000)
    const spanText = await pageHTML.match(spanRegex)[0];
    const imgUrl = await spanText.match(urlRegex)[0].replace('&quot' , '');
    return imgUrl;
  } catch (error) {
    console.error(error);
    return '';
  }
}

async function main() {
  const browser = puppeteer.launch({ headless: true }).then(async browser => {
    const [page] = await browser.pages();
    let results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        results.map((row, i) => {
          if (i < 5) {
            console.log(getImgUrl(page, row.artistUrl))
          }
        })
      })
    })
}


// function delay(time: number) {
//   return new Promise(function(resolve) { 
//       setTimeout(resolve, time)
//   });
// }
// page.goto(row.artistUrl, { waitUntil: 'networkidle0' })
//   .then((page: any) => page.evaluate(() => document.querySelector('*')!.outerHTML))
//   .then((data: string) => data.match(spanRegex)![0])
//   .then((spanText: string) => spanText.match(urlRegex)![0].replace('&quot' , ''))
//   .finally((url: string) => imgUrl = !url ? '' : url)
main();