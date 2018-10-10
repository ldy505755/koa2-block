const axios = require('axios')
const lodash = require('lodash')
const config = require('../config')

/**
 * 基于 Promise 的 HTTP 库
 * @param  {string} url    用于请求的服务器 URL
 * @param  {object} data   作为请求主体被发送的数据
 * @param  {string} method 创建请求时使用的方法, 默认是 GET
 * @return {object}        响应数据
 */
module.exports = (url, data, method) => {
  let opts = {
    url: url,
    method: method || 'get',
    baseURL: config['api']
  }
  opts = data
    ? lodash.merge(opts, {data})
    : opts

  return axios(opts).then(response => {
    if (response.status === 200) {
      if (config['env'] === 'development') {
        console.log('~~~~~~~~~~ Response ~~~~~~~~~~')
        console.log(response.data)
      }
      return response.data
    } else {
      console.log('~~~~~~~~~~ Response ~~~~~~~~~~')
      // console.log(response.data)
      console.log('Status:', response.status)
      console.log('Status Text:', response.statusText)
      console.log('~~~~~ Headers ~~~~~')
      console.log(response.headers)
      console.log('~~~~~ Config ~~~~~')
      console.log(response.config)
    }
  }).catch(error => {
    console.log('~~~~~~~~~~ Error ~~~~~~~~~~')
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data)
      console.log('Status:', error.response.status)
      console.log('~~~~~ Headers ~~~~~')
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('~~~~~ Request ~~~~~')
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error:', error.message)
    }
    console.log('~~~~~ Config ~~~~~')
    console.log(error.config)
  })
}
