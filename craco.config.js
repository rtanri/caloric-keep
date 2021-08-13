/* craco.config.js */
const CracoLinariaPlugin = require('craco-linaria')
 
module.exports = {
  plugins: [
    {
      plugin: CracoLinariaPlugin,
    },
  ],
}

// installation
// $ npm install --save-dev craco-linaria linaria
// $ yarn


// fix error : craco: command not found
// $ yarn add @craco/craco