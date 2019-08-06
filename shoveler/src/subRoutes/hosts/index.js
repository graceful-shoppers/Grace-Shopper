const Apify = require('apify')
const {utils: {log}} = Apify
const routes = require('./homedepot/index')
// const routes = require('./pup/index')

exports.homedepot = async (requestContext, globalContext, routeName) => {
  let route = routes[requestContext.request.userData.type]
  await route(requestContext, globalContext, routeName)
}
