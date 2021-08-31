import React, {useEffect} from 'react';
import {AppRootStateType} from "../../app/Store";
import {getPacks, PacksStateType} from "../Packs/PacksReducer";
import {CardsStateType, getCards} from "./CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {TableForCards} from "../../commonComponents/EditableTable/CardsTableComponent";
import {CardsType} from "../../api/CardsAPI";

type PropsType = {
    packId: string
}

export const CardsContainer  = (props: PropsType) => {
    //'612e965e4721cb0004300eaf'   and empty '612e7f224721cb0004300ea6'

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getPacks({pageCount: 5}));
        dispatch(getPacks({page: 1, pageCount: 5}))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCards({cardsPack_id: props.packId}));
        // dispatch(putPacks({_id:'612b495a8f639c0004ce1389', name:'Roma'}))
    }, [dispatch]);
    const {packs, packsCount} = useSelector<AppRootStateType, PacksStateType>(state => state.packs);
    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards);
    console.log(packs)
    let cardsList: CardsType[] = cards[props.packId] ?  cards[props.packId] : []


    return cardsList.length === 0 ? <div>This pack is empty click Add new pack</div> : <><TableForCards cards={cardsList} packsCount={100}/></>
}

