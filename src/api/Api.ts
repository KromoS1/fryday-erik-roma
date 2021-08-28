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

export type CardsPackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type ParamsGetPacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}

export type ResponseGetPacks = {
    cardPacks: CardsPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type ParamsUpdatePack = {
    deckCover?: string
    name: string
    _id: string
}

export type ResponsePacksType<D = CardsPackType> = {
    data: D
    token: string
    tokenDeathTime: number
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
};

export const packApi = {
    getPacks(getParams: ParamsGetPacksType) {
        return axiosInstance.get<ResponseGetPacks>('/cards/pack', {
            params: {...getParams}
        })
    },
    addPack(name: string) {
        return axiosInstance.post<ResponsePacksType<{newCardsPack: CardsPackType}>>('/cards/pack', {
            cardsPack: {name}
        })
    },
    deletePack(id: string) {
        return axiosInstance.delete<ResponsePacksType<{deletedCardsPack: CardsPackType}>>(`/cards/pack?id=${id}`)
    },
    updatePack(putParams: ParamsUpdatePack) {
        return axiosInstance.put<ResponsePacksType<{updatedCardsPack: CardsPackType}>>('/cards/pack', {
            cardsPack:{...putParams}
        })
    }
}
