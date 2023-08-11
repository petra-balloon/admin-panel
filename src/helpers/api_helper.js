import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
export const API_URL = "http://localhost:5000/api/"
//export const Image_URL = "http://localhost:5000/static/"
//export const API_URL = "https://api.petraballoon.com/api/"
export const Image_URL = "https://api.petraballoon.com/static/"
//export const API_URL = "http://139.59.45.111/api/"
//render
//export const API_URL = "https://petra-balloon-backend.onrender.com/api/"

//export const API_URL = "https://petra-balloon.herokuapp.com/api/"

export const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

//export
// const userRole = async event => {
//   /* setIsLoading(true) */

//   const config = {
//     headers: {
//       authorization: `bearer ${event}`,
//     },
//   }
//   let response=[]
//     await axiosApi
//       .post(
//         `${API_URL}admin/user-role`,{},
//         config
//       )
//       .then( response => {
//         response = response
//       })
//       .catch(function (error) {
//         /* toastError(error) */
//       })
//       return response
// }

export const userRole = async event => {
  const config = {
    headers: {
      authorization: `bearer ${event}`,
    },
  }
  let response = []
  await axios
    .post(`${API_URL}admin/user-role`, {}, config)
    .then(res => {
      response = res?.data
    })
    .catch(err => {
      console.log(err)
    })
  return response
}
