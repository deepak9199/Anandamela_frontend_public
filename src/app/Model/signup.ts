export interface signup {
  name: string
  email: string
  phone: string
  new_password: string
  confirm_password: string
}
export interface registrationApi {
  status: string
  msg: string
  data: Data
}

export interface Data {
  user: User
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  image: any
  user_otp: string
  api_token: string
  status: string
  email_verification: any
  hash_number: any
  created_at: string
  updated_at: string
  deleted_at: any
}
