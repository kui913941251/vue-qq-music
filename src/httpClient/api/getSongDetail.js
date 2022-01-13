import request from '../../utils/request'

export default async function getSongDetail(params) {
  return request({
    url: '/getSongDetail',
    method: "post",
    data: params,
  })
}
