export interface User {
  email: string
  password: string
}

export interface errorRespond {
  message: string
  error_field: "email" | "password"
}