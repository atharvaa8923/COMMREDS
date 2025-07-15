import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function useNav() {
  var navigate = useNavigate()
  navigate('/login')
}

const baseURL = 'http://127.0.0.1:8000/'

const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('access_token')
      useNav()
    }
    return Promise.reject(error)
  },
)

export default axiosInstance