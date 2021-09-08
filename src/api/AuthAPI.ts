import axios from 'axios';
import {ProfileType} from "../components/profile/ProfileContainer";

export interface ResponseAuthType extends ProfileType {
    token?: string
    tokenDeathTime?: number
}

export interface ResponseErrorRegistrationType {
    error: string,
    email: string
}

export interface ParamsAuthType {
    email: string
    password: string
    rememberMe?:boolean
}

export interface ParamsForgotType {
    email: string
    from: string
    message: string
}

export interface ResponseForgotType {
    info: string
    error: string
}

export interface ParamsSetNewPasswordType {
    password: string
    resetPasswordToken: string
}

export const axiosInstance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
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
};
