const Apify = require('apify')
const {utils: {log}} = Apify
const hostRoutes = require('./subRoutes/hosts')

exports.host = async (requestContext, globalContext, routeName) => {
  let route = hostRoutes[requestContext.request.userData.host]
  await route(requestContext, globalContext, routeName)
}
