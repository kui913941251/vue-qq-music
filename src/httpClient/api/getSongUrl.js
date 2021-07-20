import Api from "@/httpClient"

export default async function getSongUrl(params) {
  let songInfo = await Api.getVkey(params)
  let baseUrl = "https://isure.stream.qqmusic.qq.com/"
  let fileName = songInfo.fileName
  let vkey = songInfo.vkey
  return baseUrl + fileName + "?" + "vkey=" + vkey + "&guid=3581078026" + "&uin=&fromtag=66"
}