'use strict'
import Service from './EAConfig.js'
import * as RequestService from './RequestService.js'


export function test() {
  return RequestService.get(Service.test)
}