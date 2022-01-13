import request from '../../utils/request'

export default function getSearch(params) {
  return request({
    url: '/getSearchHint',
    method: 'get',
    params,
  })
}
