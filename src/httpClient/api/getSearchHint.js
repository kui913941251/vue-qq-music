import request from "../config/requestConstruct"

export default async function getSearchHint(params) {
  // https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg
  return await request.get("/splcloud/fcgi-bin/smartbox_new.fcg", {
    headers: {

    },
    key: params.key
  })
}