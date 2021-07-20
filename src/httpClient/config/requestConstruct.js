import axios from "axios"

class Request {

  static instance = null

  constructor() {
    if (!this.instance) {
      this.instance = axios.create()
    }
  }

  async get(url, params, headers) {
    console.log(url,params);
    return await this.instance({
      url,
      headers,
      method: "get",
      params,
    })
  }

}

const request = new Request()

console.log(request);

export default request