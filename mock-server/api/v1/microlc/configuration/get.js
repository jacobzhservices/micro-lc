const {theming, plugins, analytics, helpMenu, internalPlugins} = require('../../../../configuration')

module.exports = (request, response) => {
  response
    .delay(1000)
    .send({theming, plugins, analytics, helpMenu, internalPlugins})
}
