import axios from 'axios';

export type ProfileType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
}

export type ResponseMeType = ProfileType & {
    avatar?: string
}

export type ResponseAuthType = ProfileType & {
    token?: string
    tokenDeathTime?: number
    __v: number
}

export type ResponseErrorRegistrationType = {
    error: string,
    email: string
}

export type ParamsAuthType = {
    email: string
    password: string
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})

export const authApi = {
    login(params: ParamsAuthType) {
        return axiosInstance.post<ResponseAuthType>('/auth/login', {...params})
    },
    logout() {
        return axiosInstance.delete<{ info: string }>('/auth/me')
    },
    registration(params: ParamsAuthType) {
        return axiosInstance.post<ResponseAuthType | ResponseErrorRegistrationType >('/auth/register', {...params})
            .then(response => response.data)
    },
    me(){
        return axiosInstance.post('/auth/me')
            .then(response => {
                return response.data
            });
    }
}

