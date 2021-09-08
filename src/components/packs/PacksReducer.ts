import {AppThunkType} from "../../app/Store";
import {packApi, ParamsGetPacksType, ParamsUpdatePack} from "../../api/PackAPI";
import {setStatusApp} from "../statusApp/StatusAppReducer";
import {DataAT, setRequestData} from "../../app/requestDataReducer";

export type PackAT =
    | ReturnType<typeof setPacks>
    | DataAT

export interface PackType {
    _id: string
    name: string
    cardsCount: number
    updated: string
    created: string
    grade: number
    more_id: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    user_id: string
    user_name: string
}
export interface PacksStateType {
    packsCount: number;
    packs: PackType[];
}

const initialState: PacksStateType = {
    packsCount: 0,
    packs: []
};

export const setPacks = (packs: PackType[], packsCount: number, user_id?: string) => ({
    type: 'PACKS/SET-PACKS',
    packs,
    packsCount,
    user_id
} as const);

export const PacksReducer = (state = initialState, action: PackAT): PacksStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            if (action.user_id) {
                return {
                    ...state,
                    packs: action.packs.filter(pack => pack.user_id === action.user_id),
                    packsCount: action.packsCount
                };
            }
            return {...state, packs: action.packs, packsCount: action.packsCount};
        default:
            return state
    }
}

export const getPacks = (getParams: ParamsGetPacksType): AppThunkType => async (dispatch, getState) => {
    dispatch(setStatusApp('load', ''));
    const savedParams = getState().getPacksParams;
    try {
        const data = await packApi.getPacks({...savedParams, ...getParams});
        dispatch(setRequestData({...savedParams, ...getParams}));
        dispatch(setPacks(data.cardPacks, data.cardPacksTotalCount));
        dispatch(setStatusApp('success', 'Success!'));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const addPack = (getParams: ParamsGetPacksType, cardsPack: { name: string, private: boolean }, userId?: string): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await packApi.addPack(cardsPack);
        dispatch(setRequestData({...getParams, user_id: userId}));
        dispatch(getPacks({...getParams, user_id: userId}));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const putPacks = (getParams: ParamsGetPacksType, pack: ParamsUpdatePack): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await packApi.updatePack(pack);
        dispatch(setRequestData({...getParams}));
        dispatch(getPacks(getParams));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const removePack = (getParams: ParamsGetPacksType, id: string): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await packApi.deletePack(id);
        dispatch(setRequestData({...getParams}));
        dispatch(getPacks(getParams));
        dispatch(setStatusApp('success', 'Success'));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}