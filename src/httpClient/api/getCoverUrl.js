import request from '../../utils/request'

export default function getCoverUrl(params) {
  return request({
    url: '/getCoverUrl',
    encoding: null,
    headers: {
      accept: 'image/jpg',
      responseType: 'arraybuffer',
    },
    method: 'get',
    params,
  })
}
