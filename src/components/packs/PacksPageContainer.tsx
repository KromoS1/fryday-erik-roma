import React, {FC, memo, useCallback, useEffect} from 'react';
import {PacksPage} from "./PacksPage";
import {useDispatch, useSelector} from "react-redux";
import {addPack, getPacks} from "./PacksReducer";
import {AppRootStateType} from "../../app/Store";
import {PackDataRequestType} from "../../app/requestDataReducerPacks";

export const PacksPageContainer: FC = memo(() => {
    const dataParams = useSelector<AppRootStateType, PackDataRequestType>(state => state.getPacksParams);
    const meId = useSelector<AppRootStateType, string>(state => state.profile._id);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPacks({user_id: '', min: 0, max: 5, sortPacks: ''}));
    }, [dispatch]);

    const addNewPack = useCallback((newPackName: string) => {
        const card = {
            name: newPackName,
            private: false
        }
        dispatch(addPack(dataParams, card, meId));
    }, [dispatch, dataParams, meId]);

    return <PacksPage addNewPack={addNewPack}/>
})