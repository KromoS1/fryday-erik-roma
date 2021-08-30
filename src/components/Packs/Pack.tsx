import React, {FC, memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {getPacks, PackType, removePack} from "./PacksReducer";
import {CardsType} from "../../api/CardsAPI";
import {CardsStateType} from "../Cards/CardsReducer";
import {TableForPacks} from "../../commonComponents/EditableTable/TableForCards";

type PropsType = {
    pack: PackType
    cards: CardsType[]
    remove: (id: string) => void
}

export const Pack: FC<PropsType> = memo(props => {

    return (
        <>
            {props.pack.name}
            <button onClick={() => props.remove(props.pack._id)}>remove</button>
        </>
    )
})


export const PackContainer = () => {
    const packs = useSelector<AppRootStateType, PackType[]>(state => state.packs);
    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards);
    const meID = useSelector<AppRootStateType, string>(state => state.profile._id);
    const dispatch = useDispatch();

    console.log('render pack')

    useEffect(() => {
        dispatch(getPacks({pageCount: 10}));
        // dispatch(putPacks({_id:'612b495a8f639c0004ce1389', name:'Roma'}))
    }, [dispatch])

    const remove = (id: string) => {
        dispatch(removePack(id));
    }

    return (
        <>
           <TableForPacks packs={packs}/>
        </>
    )
}