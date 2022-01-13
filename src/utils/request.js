import axios from "axios"

function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: -1
  })

  instance.interceptors.response.use((res) => {
    return res.data
  })


  return instance(config)
}


export default request