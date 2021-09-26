import {axiosInstance} from "./AuthAPI";

export interface CardDataRequestType {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export interface CardsType {
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
    grade: Grade
}

export interface ResponseType {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export interface CardRequestType {
    cardPack_id: string
    type?: string
    answer?: string
    question?: string
    grade?: number
    shots?: number
}

export interface UpdateCardType {
    _id: string
    question?: string
    answer?: string
    comments?: string
}

export interface GradeType {
    _id: string
    pack_id: string
    card_id: string
    user_id: string
    grade: Grade
    shots: number
}

export enum Grade {
    one = 1,
    two,
    three,
    four,
    five,
}

export const cardsApi = {
    getCards(params: CardDataRequestType) {
        return axiosInstance.get<ResponseType>('/cards/card', {
            params: {...params, pageCount: 10}
        }).then(response => response.data.cards);
    },
    createCard(card: CardRequestType) {
        return axiosInstance.post('/cards/card', {
            card: {
                cardsPack_id: card.cardPack_id,
                question: card.question,
                answer: card.answer
            }
        }).then(response => response.data);
    },
    updateCard(putCard: UpdateCardType) {
        return axiosInstance.put('/cards/card', {putCard});
    },
    deleteCard(id: string) {
        return axiosInstance.delete(`/cards/card?id=${id}`);
    },
    updateGrade(card_id: string, grade: Grade) {
        return axiosInstance.put<GradeType>('/cards/grade', {card_id, grade}).then(response => response.data);
    }
}