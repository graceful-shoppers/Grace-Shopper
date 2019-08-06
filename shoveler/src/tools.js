const Apify = require('apify')
const routes = require('./routes')
const {utils: {log}} = Apify
let psl = require('psl')

function extractHostname(url) {
  var hostname
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  //find & remove port number
  hostname = hostname.split(':')[0]
  //find & remove "?"
  hostname = hostname.split('?')[0]
  return hostname
}

exports.getStaticSources = async () => {
  log.debug('Getting sources.')
  const input = await Apify.getInput()
  return input.sources.static.map(site => {
    return {
      url: site.url,
      userData: {
        type: 'enqueue',
        label: 'host',
        host: psl.get(extractHostname(site.url)).split('.')[0]
      }
    }
  })
}

exports.createRouter = globalContext => {
  return async function(routeName, requestContext) {
    console.log('in created router')
    const route = routes[routeName]
    if (!route) throw new Error(`No route for name: ${routeName}`)
    log.debug(`Invoking route: ${routeName}`)
    return route(requestContext, globalContext, routeName)
  }
}
