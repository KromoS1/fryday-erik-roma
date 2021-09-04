import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/Store";
import {getPacks, PacksStateType, removePack} from "../PacksReducer";
import {PacksTable} from "./PacksTable";
import {ComponentNameType} from "../PacksPage";
import {DataRequestType} from "../../../app/requestDataReducer";

type PacksContainerType = ComponentNameType & {
    meID?: string
}

export const PacksTableContainer: FC<PacksContainerType> = props => {
    const {packs, packsCount} = useSelector<AppRootStateType, PacksStateType>(state => state.packs);
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const dispatch = useDispatch();

    useEffect(() => {
        props.meID
            ? dispatch(getPacks({page: 1, pageCount: 5, user_id: props.meID}))
            : dispatch(getPacks({page: 1, pageCount: 5,}))
    }, [dispatch])

    const remove = (id: string) => {
        dispatch(removePack(dataParams, id));
    }

    return (
        <>
            <PacksTable packs={packs} packsCount={packsCount} remove={remove} meID={props.meID} name={"packs"} dataParams={dataParams}/>
        </>
    )
}