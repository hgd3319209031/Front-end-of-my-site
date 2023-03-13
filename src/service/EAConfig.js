"use strict";
let BaseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001/' : 'https://napi.ebaas.com/'

export default {
    test: BaseURL + '/getpost'
}

export const key = '8e7caa851c883844bbd5a551dc869418'
export const client = 'coupon_20220729'