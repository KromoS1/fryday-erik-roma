import React, {FC, memo, useCallback, useEffect} from 'react';
import {PacksPage} from "./PacksPage";
import {useDispatch, useSelector} from "react-redux";
import {addPack, getPacks} from "./PacksReducer";
import {AppRootStateType} from "../../app/Store";
import {DataRequestType} from "../../app/requestDataReducer";

export const PacksPageContainer: FC = memo(() => {
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const meId = useSelector<AppRootStateType, string>(state => state.profile._id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPacks({user_id: '', max: 5, min: 1, sortPacks: ''}))
    }, [dispatch])
    const addNewPack = useCallback((newPackName: string) => {
        const cardsName = {
            name: newPackName,
            private: false
        }
        dispatch(addPack(dataParams, cardsName, meId))
    }, [dispatch])

    return <PacksPage addNewPack={addNewPack}/>
})