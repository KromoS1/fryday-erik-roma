import axios from "axios";

export type GetCardsRequestType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCard?: number
    page?: number
    pageCount?: number
}

export type  CardsType = {
    _id: string
    cardsPack_id: string
    user_id: string
    type: string
    answer: string
    question: string
    rating: number
    shots: number
    created: string
    updated: string
}

export type ResponseType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardRequestType = {
    cardsPack_id: string
    type?: string
    answer?: string
    question?: string
    grade?: number
    shots?: number
}

export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    comments?: string
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})

export const cardsApi = {
    getCards(params:GetCardsRequestType) {
        return axiosInstance.get<ResponseType>('/cards/card',{
            params:{...params}
        }).then(response => response.data.cards);
    },
    createCard(card: CardRequestType) {
        return axiosInstance.post('/cards/card', {card}).then(response => response.data);
    },
    updateCard(putCard: UpdateCardType) {
        return axiosInstance.put('/cards/card',{putCard});
    },
    deleteCard(id: string) {
        return axiosInstance.delete(`/cards/card?id=${id}`);
    }
}