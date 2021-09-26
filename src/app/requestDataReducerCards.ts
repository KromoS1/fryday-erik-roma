import {CardDataRequestType} from "../api/CardsAPI";

export type DataCardsAT =
    | ReturnType<typeof setRequestCardData>

const initialState: CardDataRequestType = {
    cardAnswer:'',
    cardQuestion:'',
    cardsPack_id:'',
    min: 0,
    max: 0,
    sortCards: '',
    page: 0,
    pageCount: 5
}

export const setRequestCardData = (data: CardDataRequestType) => ({
    type: 'DATA-CARDS/SET-REQUEST-DATA',
    data
} as const);

export const DataRequestReducerCards = (state = initialState, action: DataCardsAT): CardDataRequestType => {
    switch (action.type) {
        case "DATA-CARDS/SET-REQUEST-DATA":
            return {...state, ...action.data}
        default:
            return state
    }
}