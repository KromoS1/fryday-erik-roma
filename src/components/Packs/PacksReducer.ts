import {AppThunkType} from "../../app/Store";
import {packApi, ParamsGetPacksType, ParamsUpdatePack} from "../../api/PackAPI";
import {setStatusApp} from "../statusApp/StatusAppReducer";

export type PackAT =
    | ReturnType<typeof setPacks>

export type PackType = {
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
export type PacksStateType = {
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
                return {...state,
                    packs: action.packs.filter(pack => pack.user_id === action.user_id),
                    packsCount: action.packsCount
                };
            }
            return {...state, packs: action.packs, packsCount: action.packsCount};
        default:
            return state
    }
}

export const getPacks = (getParams: ParamsGetPacksType): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        const data = await packApi.getPacks(getParams);
        dispatch(setPacks(data.cardPacks, data.cardPacksTotalCount));
        dispatch(setStatusApp('success', 'Success!'));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const addPack = (cardsPack: { name: string, private: boolean }, userId?: string): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await packApi.addPack(cardsPack);
        dispatch(getPacks({pageCount: 5, page: 1, user_id: userId}));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const putPacks = (pack: ParamsUpdatePack): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await packApi.updatePack(pack);
        dispatch(getPacks({}));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

export const removePack = (id: string): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await packApi.deletePack(id);
        dispatch(getPacks({}));
        dispatch(setStatusApp('success', 'Success'));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}