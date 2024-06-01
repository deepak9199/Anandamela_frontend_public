export interface login {
    username: string
    password: string;
}

export interface ApiloginData {
    status: string
    msg: string
    data: Data
}

export interface Data {
    user_details: UserDetails
}

export interface UserDetails {
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
