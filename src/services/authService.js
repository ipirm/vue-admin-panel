import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export async function refreshTokens() {
  try {
    const { data } = await apiRequest.post('customer/refresh-token', {token: getRefreshToken()})
    localStorage.setItem('expiresIn', data.expires_in)
    localStorage.setItem('accessToken', data.access_token)
    localStorage.setItem('refreshToken', data.refresh_token)
    $router.go()
  } catch (e) {console.log(e)}
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken')
}

export function isAccessTokenExpired() {
  const accessTokenExpDate = localStorage.getItem('expiresIn') - 1
  const nowTime = Math.floor(new Date().getTime() / 1000)

  return accessTokenExpDate <= nowTime
}