// import jsonp from 'common/js/jsonp'
// import {commonParams, options} from './config'
import axios from 'axios'

// export function getHotKey() {
//   const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

//   const data = Object.assign({}, commonParams, {
//     uin: 0,
//     needNewCode: 1,
//     platform: 'h5'
//   })

//   return jsonp(url, data, options)
// }

// export function search(query, page, zhida, perpage) {
//   const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'

//   const data = Object.assign({}, commonParams, {
//     w: query,
//     p: page,
//     perpage,
//     n: perpage,
//     catZhida: zhida ? 1 : 0,
//     zhidaqu: 1,
//     t: 0,
//     flag: 1,
//     ie: 'utf-8',
//     sem: 1,
//     aggr: 0,
//     remoteplace: 'txt.mqq.all',
//     uin: 0,
//     needNewCode: 1,
//     platform: 'h5'
//   })

//   return jsonp(url, data, options)
// }

export function getSearch (val) {
  const url = '/api/search'
  const data = Object.assign({}, {
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    remoteplace: 'txt.yqq.center',
    searchid: 44024067668668780,
    t: 0,
    aggr: 1,
    cr: 1,
    catZhida: 1,
    lossless: 0,
    flag_qc: 0,
    p: 1,
    n: 20,
    w: val,
    g_tk: 5381,
    jsonpCallback: 'MusicJsonCallback8582308762409112',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
