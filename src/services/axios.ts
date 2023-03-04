import axios, { InternalAxiosRequestConfig } from 'axios'
import TokenService from './token.service'
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json'
  }
})
// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken()
    if (token) {
      config.headers!['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (  error: any) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res: any) => {
    return res.data
  },
  async (err) => {
    const originalConfig = err.config
    if (!originalConfig) return;
    if (originalConfig.url !== '/authentication/admin-login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          const rs = await instance.post('/v1/token/refresh', {
            refresh: TokenService.getLocalRefreshToken()
          })

          const { access } = rs.data
          if (access) {
            TokenService.updateLocalAccessToken(access)
          }

          return instance(originalConfig)
        } catch (_error) {
          TokenService.removeAuth()
          // window.location.href = '/login'
          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(err?.response?.data)
  }
)

export default instance
