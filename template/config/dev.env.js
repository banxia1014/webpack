'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: (process.env.NODE_ENV === 'production')
    ? '"/"'
    : '"https://qianfan13.qianfanapi.com/"',
  CookieDomain: (process.env.NODE_ENV === 'production')
    ? '.qianfanapi.com'
    : ''
})
