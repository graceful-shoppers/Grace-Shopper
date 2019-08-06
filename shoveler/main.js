const Apify = require('apify')
const tools = require('./src/tools')
const cheerCrawler = require('./crawls/cheerioCrawl')

Apify.main(async () => {
  // Get input of the actor (here only for demonstration purposes).
  // If you'd like to have your input checked and have Apify display
  // a user interface for it, add INPUT_SCHEMA.json file to your actor.
  // For more information, see https://apify.com/docs/actor/input-schema
  const staticInput = await tools.getStaticSources()
  console.log('Input:')
  console.log(staticInput)
  const staticRequestList = await Apify.openRequestList('HOSTS', staticInput)
  const staticRequestQueue = await Apify.openRequestQueue()
  const chCrawler = await cheerCrawler(staticRequestList, staticRequestQueue)

  await chCrawler.run()

  // Open a request queue and add a start URL to it
  // const requestQueue = await Apify.openRequestQueue();
  // await requestQueue.addRequest({ url: 'https://www.iana.org/' });

  // // Define a pattern of URLs that the crawler should visit
  // const pseudoUrls = [new Apify.PseudoUrl('https://www.iana.org/[.*]')];

  // // Create a crawler that will use headless Chrome / Puppeteer to extract data
  // // from pages and recursively add links to newly-found pages
  // const crawler = new Apify.PuppeteerCrawler({
  //     requestQueue,

  //     // This function is called for every page the crawler visits
  //     handlePageFunction: async ({ request, page }) => {
  //         const title = await page.title();
  //         console.log(`Title of ${request.url}: ${title}`);
  //         await Apify.pushData({
  //             title,
  //             '#debug': Apify.utils.createRequestDebugInfo(request),
  //         });
  //         await Apify.utils.enqueueLinks({ page, selector: 'a', pseudoUrls, requestQueue });
  //     },

  //     // This function is called for every page the crawler failed to load
  //     // or for which the handlePageFunction() throws at least "maxRequestRetries"-times
  //     handleFailedRequestFunction: async ({ request }) => {
  //         console.log(`Request ${request.url} failed too many times`);
  //         await Apify.pushData({
  //             '#debug': Apify.utils.createRequestDebugInfo(request),
  //         });
  //     },

  //     maxRequestRetries: 2,
  //     maxRequestsPerCrawl: 100,
  //     maxConcurrency: 10,
  // });

  // await crawler.run();
})
