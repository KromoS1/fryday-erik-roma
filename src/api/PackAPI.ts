import axios from 'axios';
import {PackType} from "../components/Packs/PacksReducer";

export type ParamsGetPacksType = {
    user_id?: string
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
}

export type ResponseGetPacks = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type ParamsUpdatePack = {
    _id: string
    deckCover?: string
    name: string
}

export type ResponsePacksType<D = PackType> = {
    data: D
    token: string
    tokenDeathTime: number
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})


export const packApi = {
    getPacks(getParams: ParamsGetPacksType) {
        return axiosInstance.get<ResponseGetPacks>('/cards/pack', {
            params: {...getParams}
        }).then(response => response.data);
    },
    addPack(pack:{name:string,private:boolean}) {
        return axiosInstance.post<ResponsePacksType<{newCardsPack: PackType}>>('/cards/pack', {
            cardsPack:{
                name:pack.name,
                private:pack.private,
            }
        })
    },
    deletePack(id: string) {
        return axiosInstance.delete<ResponsePacksType<{deletedCardsPack: PackType}>>(`/cards/pack?id=${id}`)
    },
    updatePack(putParams: ParamsUpdatePack) {
        return axiosInstance.put<ResponsePacksType<{updatedCardsPack: PackType}>>('/cards/pack', {
            cardsPack:{...putParams}
        })
    }
}
