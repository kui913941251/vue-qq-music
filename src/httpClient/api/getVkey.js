import request from "../../utils/request"

export default async function(params = {}) {
  let data = {
    sign: "zza0ibw00fydk3665bbe3638c94666e4e802f3132496da4",
    "data": {
      "req":{
        "module":"CDN.SrfCdnDispatchServer",
        "method":"GetCdnDispatch",
        "param":{
          "guid":"3581078026",
          "calltype":0,
          "userip":""
        }
      },
      "req_0":{
        "module":"vkey.GetVkeyServer",
        "method":"CgiGetVkey",
        "param":{
          "guid":"3581078026",
          "songmid":[params.songmid],
          "songtype":[0],
          "uin":"0",
          "loginflag":1,
          "platform":"20"
        }
      },
      "comm":{
        "uin":0,
        "format":"json",
        "ct":24,
        "cv":0
      }
    }
  }
  let {data: res} = await request.get("/cgi-bin/musics.fcg", data)
  console.log(res);
  return {
    fileName: res.req_0.data.midurlinfo[0].filename,
    vkey: res.req_0.data.midurlinfo[0].vkey
  }
}