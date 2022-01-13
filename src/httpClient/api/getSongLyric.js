import request from '../../utils/request'

export default function getSongLyric(params) {
  return request({
    url: '/getSongLyric',
    method: 'get',
    params,
  })
}
