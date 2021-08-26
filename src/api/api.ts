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

export type ParamsForgotType = {
    email: string
    from: string
    message: string
}

export type ResponseForgotType = {
    info: string
    error: string
}

export type ParamsSetNewPasswordType = {
    password: string
    resetPasswordToken: string
}
const axiosInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
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
        return axiosInstance.post<ResponseAuthType | ResponseErrorRegistrationType>('/auth/register', {...params})
            .then(response => response.data)
    },
    me(){
        return axiosInstance.post('/auth/me')
            .then(response => response.data);
    },
    forgot(params: ParamsForgotType) {
        return axiosInstance.post<ResponseForgotType>('/auth/forgot', {...params})
    },
    setNewPassword(params: ParamsSetNewPasswordType) {
       return axiosInstance.post<{info: string}>('/auth/set-new-password', params)
           .then(res =>  res.data)
    }
}
