import {CardRequestType, cardsApi, CardsType, CardDataRequestType, Grade, UpdateCardType} from "../../api/CardsAPI";
import {AppThunkType} from "../../app/Store";
import {setModalStatus, setStatusApp} from "../statusApp/StatusAppReducer";
import {DataCardsAT, setRequestCardData} from "../../app/requestDataReducerCards";

export type CardAT =
    | ReturnType<typeof setCards>
    | ReturnType<typeof getCardGrade>
    | ReturnType<typeof updateCardsLocal>
    | DataCardsAT

export interface GradeUpdateType {
    card_id: string
    grade: number
}

export interface CardsStateType {
    cards: CardsType[]
    gradeData: GradeUpdateType
}

const initialState: CardsStateType = {
    gradeData: {
        card_id: '',
        grade: 0
    },
    cards: []
}

export const setCards = (cards: CardsType[], packId: string) => ({type: "CARDS/GET-CARDS", cards, packId} as const);
export const getCardGrade = (gradeData: GradeUpdateType) => ({type: "CARDS/GET_CARDS_GRADE", gradeData} as const);
export const updateCardsLocal = (gradeData: GradeUpdateType) => ({type: "CARDS/UPDATE_CARDS", gradeData} as const);

export const CardsReducer = (state = initialState, action: CardAT): CardsStateType => {
    switch (action.type) {
        case "CARDS/GET-CARDS":
            return {...state, cards: action.cards}
        case "CARDS/GET_CARDS_GRADE":
            return {...state, gradeData: action.gradeData}
        case "CARDS/UPDATE_CARDS":
            const cardsCopy = state.cards.map(card => {
                return card._id === state.gradeData.card_id ? {
                    ...card,
                    grade: (card.grade + state.gradeData.grade) / 2
                } : card
            })
            return {...state, cards: [...cardsCopy]}
        default:
            return state
    }
}

export const getCards = (getParams: CardDataRequestType): AppThunkType =>
    async (dispatch, getState) => {
        const savedParams = getState().getCardsParams;
        dispatch(setStatusApp('load', ''));
        try {
            const cards = await cardsApi.getCards({...savedParams, ...getParams});
            dispatch(setRequestCardData({...savedParams,...getParams}));
            dispatch(setCards(cards, getParams.cardsPack_id));
            dispatch(setModalStatus("no-status", false, ''))
        } catch (error) {
            dispatch(setStatusApp('error', error.message));
        } finally {
            dispatch(setStatusApp('idle', ''));
        }
    }

export const addCards = (card: CardRequestType): AppThunkType => async dispatch => {
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

export const updateCards = (putCard: UpdateCardType, params: CardDataRequestType): AppThunkType => async dispatch => {
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

export const deleteCards = (id: string, params: CardDataRequestType): AppThunkType => async dispatch => {
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

export const updateGrade = (card_id: string, grade: Grade): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await cardsApi.updateGrade(card_id, grade);
        dispatch(getCardGrade({card_id, grade}))
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}