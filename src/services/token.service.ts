const getLocalRefreshToken = () => {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem('user') as any)
    return user?.refreshToken
  }
}

const getLocalAccessToken = () => {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem('user') as any)
    return user?.access_token
  }
}

const updateLocalAccessToken = (token: string) => {
  if (typeof window !== 'undefined') {
    let user = JSON.parse(localStorage.getItem('user') as any)
    user.accessToken = token
    localStorage.setItem('user', JSON.stringify(user))
  }
}

const getAuth = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('user') as any)
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
