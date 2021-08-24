import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:7542/2.0",
    withCredentials: true,
})

export const apiPing = {
    pingGet() {
        return axiosInstance.get("/ping").then(response => {
            console.log(response)
        })
    }
}
export const authApi = {
    login(params: LoginRequestParamsType) {
        return axiosInstance.post<LoginResponseType>("/auth/login", {...params})
    },
    logout() {
        return axiosInstance.delete<LogoutResponseType>("/auth/me")
    },
    registration(params: RegistrationRequestParamsType) {
        return axiosInstance.post<RegistrationResponseType>("/auth/register", {...params})
            .then(response => response.data)
    }
}
export type LoginResponseType = {
    _id: string
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: Date
    verified: boolean

}
export type RegistrationResponseType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: Date
    updated: Date
    __v: number
}
export type LogoutResponseType = {
    info: string
}

export type LoginRequestParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type RegistrationRequestParamsType = {
    email: string
    password: string
}