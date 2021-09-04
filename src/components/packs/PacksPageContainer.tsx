import React, {FC, memo, useCallback} from 'react';
import {PacksPage} from "./PacksPage";
import {useDispatch, useSelector} from "react-redux";
import {addPack} from "./PacksReducer";
import {AppRootStateType} from "../../app/Store";
import {DataRequestType} from "../../app/requestDataReducer";

export const PacksPageContainer: FC = memo(() => {
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const meId = useSelector<AppRootStateType, string>(state => state.profile._id);
    const dispatch = useDispatch();

    const addNewPack = useCallback((newPackName: string) => {
        const cardsName = {
            name: newPackName,
            private: false
        }
        dispatch(addPack(dataParams, cardsName, meId))
    }, [dispatch,dataParams,meId])

    return <PacksPage addNewPack={addNewPack}/>
})