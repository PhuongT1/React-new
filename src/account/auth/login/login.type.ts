export interface User {
  email: string
  password: string
}

export interface Token {
  access_token?: string
  expires_in?: string
  refresh_token?: string
  token_type?: string
}