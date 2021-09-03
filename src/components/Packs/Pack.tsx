import React, {FC, memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {getPacks, PacksStateType, PackType, removePack} from "./PacksReducer";
import {CardsType} from "../../api/CardsAPI";
import {PacksTable} from "../../commonComponents/EditableTable/PacksTable";
import {ComponentNameType} from "./PacksPage";
import {DataRequestType} from "../../app/requestDataReducer";

type PackPropsType =ComponentNameType & {
    pack: PackType
    cards: CardsType[]
    remove: (id: string) => void
}

type PacksContainerType = ComponentNameType & {
    meID?: string
}

export const Pack: FC<PackPropsType> = memo(props => {
    return (
        <>
            {props.pack.name}
            <button onClick={() => props.remove(props.pack._id)}>remove</button>
        </>
    )
})

export const PackContainer: FC<PacksContainerType> = props => {
    const {packs, packsCount} = useSelector<AppRootStateType, PacksStateType>(state => state.packs);
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const dispatch = useDispatch();
    console.log(dataParams)
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