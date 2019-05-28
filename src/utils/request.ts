/**
 * wrapper: https://github.com/umijs/umi-request
 */
import { notification } from 'antd'
import { extend } from 'umi-request'
import { ResponseError } from 'umi-request/types'

const codeMessage = {
  200: 'OK. ',
  201: 'Object created or modified. ',
  202: 'A request has entered the background queue (asynchronous task.)',
  204: 'Object deleted. ',
  400: 'Bad Request. ',
  401: 'Unauthorized. ',
  403: 'Forbidden - user doesn\'t have enough permissions. ',
  404: 'Not Found. ',
  406: 'The format of the request is not acceptable. ',
  410: 'Object is not available any more. ',
  422: 'The request was well-formed but was unable to be followed due to semantic errors. ',
  500: 'Internal Server Error. ',
  502: 'Gateway error. ',
  503: 'Service Unavailable. ',
  504: 'Gateway Timeout. '
}

function errorHandler (error: ResponseError) {
  const response = error.response
  const errortext = codeMessage[response.status] || response.statusText

  notification.error({
    message: `Request error ${response.status}: ${response.url}`,
    description: errortext
  })
}

/**
 * Sets default request parameters
 */
const request = extend({
  errorHandler,
  credentials: 'include' // Whether the default request comes with a cookie
})

export default request
