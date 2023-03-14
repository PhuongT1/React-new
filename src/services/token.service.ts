export interface Token {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

const getLocalRefreshToken = () => {
  if (typeof window !== 'undefined') {
    const user: Token = JSON.parse(localStorage.getItem('user') as string)
    return user.refresh_token
  }
}

const getLocalAccessToken = () => {
  if (typeof window !== 'undefined') {
    const user: Token = JSON.parse(localStorage.getItem('user') as string)
    return user?.access_token
  }
}

const updateLocalAccessToken = (token: string) => {
  if (typeof window !== 'undefined') {
    let user: Token = JSON.parse(localStorage.getItem('user') as string)
    user.access_token = token
    localStorage.setItem('user', JSON.stringify(user))
  }
}

const getAuth = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('user') as string)
  }
}

const setAuth = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

const removeAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
  }
}

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getAuth,
  setAuth,
  removeAuth
}

export default TokenService
