const Apify = require('apify')
const tools = require('../src/tools')
const {utils: {log}} = Apify

const cheerCrawler = async function(requestList, requestQueue) {
  const router = tools.createRouter({requestQueue})
  return new Apify.CheerioCrawler({
    maxRequestsPerCrawl: 1000,
    requestList,
    requestQueue,
    handlePageFunction: async context => {
      const {request} = context
      log.info(`Processing ${request.url}`)
      await router(request.userData.label, context)
    }
  })
}

module.exports = cheerCrawler

// cheerioCrawler()
