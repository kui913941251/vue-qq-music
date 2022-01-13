import request from '../../utils/request'

export default async function getSearchHint(params) {
  return request({
    url: '/getSearchHint',
    method: 'get',
    params,
  })
}
