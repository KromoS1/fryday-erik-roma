import {CardRequestType, cardsApi, CardsType, GetCardsRequestType, Grade, UpdateCardType} from "../../api/CardsAPI";
import {AppThunkType} from "../../app/Store";
import {setModalStatus, setStatusApp} from "../statusApp/StatusAppReducer";

export type CardAT = | ReturnType<typeof setCards>

export interface CardsStateType {
    [key: string]: CardsType[]
}

const initialState: CardsStateType = {}

export const setCards = (cards: CardsType[], packId: string) => ({type: "CARDS/GET-CARDS", cards, packId} as const);

export const CardsReducer = (state = initialState, action: CardAT): CardsStateType => {
    switch (action.type) {
        case "CARDS/GET-CARDS":
            return {...state, [action.packId]: [...action.cards]}
        default:
            return state
    }
}

export const getCards = (params: GetCardsRequestType): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        const cards = await cardsApi.getCards(params);
        dispatch(setCards(cards, params.cardsPack_id));
        dispatch(setModalStatus("no-status", false, ''))
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const addCards = (card: CardRequestType): AppThunkType => async dispatch => {
    console.log(card)
    dispatch(setStatusApp('load', ''));
    try {
        await cardsApi.createCard(card);
        dispatch(getCards({cardsPack_id: card.cardPack_id}));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const updateCards = (putCard: UpdateCardType, params: GetCardsRequestType): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await cardsApi.updateCard(putCard);
        dispatch(getCards(params));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const deleteCards = (id: string, params: GetCardsRequestType): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await cardsApi.deleteCard(id);
        dispatch(getCards(params));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const updateGrade = (card_id: string, grade: Grade, params: GetCardsRequestType): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await cardsApi.updateGrade(card_id, grade);
        dispatch(getCards(params));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}