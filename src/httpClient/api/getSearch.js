import request from "../config/requestConstruct"

export default async function getSearch(params) {
  // https://c.y.qq.com/soso/fcgi-bin/client_search_cp
  // https://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist
  return await request.get("/soso/fcgi-bin/client_music_search_songlist", {
    w: params.key,
    remoteplace: params.remoteplace
  }, {
    referer: "https://y.qq.com/"
  })
}