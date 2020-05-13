import axios from 'axios'
import { API_URI } from '../config'
import { refreshTokens, getRefreshToken, isAccessTokenExpired } from '../services/authService'

function headers() {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }
}

const request = (callback) => {
  return new Promise((resolve, reject) => {
    callback
      .then(data => resolve(data))
      .catch(e => reject(handleError(e)));
  })
}

const handleError = (e) => {
  if (!e.response) return {_e: 'Unknown Error'};
  if (e.response.status === 401) {
    if (isAccessTokenExpired() && getRefreshToken()) {
      refreshTokens()
    } else {
      window.location = '/auth/login'
    }
  }
  if (e.response.status !== 400) return {_e: e.response.statusText}
  const edata = e.response.data
    return typeof edata !== 'object' || Object.values(edata).filter(v => !Array.isArray(v)).length > 0
      ? { _e: 'Unknown server response' }
      : e.response.data
}

export default class apiRequest {
  static get(path) {
    return request(axios.get(`${API_URI}/${path}`, headers()));
  }

  static getPublic(path) {
    return request(axios.get(`${API_URI}/${path}`));
  }

  static post(path, data) {
    return request(axios.post(`${API_URI}/${path}`, data, headers()));
  }

  static patch(path, data) {
    return request(axios.patch(`${API_URI}/${path}`, data, headers()));
  }

  static delete(path) {
    return request(axios.delete(`${API_URI}/${path}`, headers()));
  }
}
