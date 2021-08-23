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
    forgot() {

    }
}
export type LoginResponseType = {
    id: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean

}
export type LoginRequestParamsType = {
    email: string
    password: string
    rememberMe: boolean
}