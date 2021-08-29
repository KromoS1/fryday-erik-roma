import {AppThunkType} from "../../app/Store";
import {packApi, ParamsGetPacksType, ParamsUpdatePack} from "../../api/PackAPI";
import {setStatusApp} from "../statusApp/StatusAppReducer";

export type CardsPackAT =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof createPack>
    | ReturnType<typeof updatePack>
    | ReturnType<typeof deletePack>


export type CardsPackType = {
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

const initialState: CardsPackType[] = [];

export const setPacks = (packs: CardsPackType[],user_id?:string) => ({type: 'PACKS/SET-PACKS', packs,user_id} as const);
export const createPack = (packs: CardsPackType[]) => ({type: 'PACKS/CREATE-PACK', packs} as const);
export const updatePack = (packs: CardsPackType[]) => ({type: 'PACKS/UPDATE-PACK', packs} as const);
export const deletePack = (packs: CardsPackType[]) => ({type: 'PACKS/DELETE-PACK', packs} as const);

export const PacksReducer = (state = initialState, action: CardsPackAT): CardsPackType[] => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            if (action.user_id){
                return action.packs.filter(pack => pack.user_id === action.user_id);
            }
            return action.packs;
        case "PACKS/CREATE-PACK":
        case "PACKS/UPDATE-PACK":
        case "PACKS/DELETE-PACK":
            return action.packs
        default:
            return state
    }
}

export const getPacks = (getParams: ParamsGetPacksType): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load',''));
    try{
        const data = await packApi.getPacks(getParams);
        dispatch(setPacks(data.cardPacks));
    }
    catch(error){
        dispatch(setStatusApp('error',error.message));
    }finally{
        dispatch(setStatusApp('idle',''));
    }
}

export const addPack = (cardsPack:{name:string,private:boolean}):AppThunkType => async dispatch => {
    dispatch(setStatusApp('load',''));
    try {
        await packApi.addPack(cardsPack);
        dispatch(getPacks({}));
    }catch (error){
        dispatch(setStatusApp('error',error.message));
    }finally {
        dispatch(setStatusApp('idle',''));
    }
}

export const putPacks = (pack:ParamsUpdatePack): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load',''));
    try{
        await packApi.updatePack(pack);
        dispatch(getPacks({}));
    }catch (error){
        dispatch(setStatusApp('error',error.message));
    }finally {
        dispatch(setStatusApp('idle',''));
    }
}

export const removePack = (id:string):AppThunkType => async dispatch => {
    dispatch(setStatusApp('load',''));
    try{
        await packApi.deletePack(id);
        dispatch(getPacks({}));
        dispatch(setStatusApp('success','Success'));
    }catch (error){
        dispatch(setStatusApp('error',error.message));
    }
    finally {
        dispatch(setStatusApp('idle',''));
    }
}