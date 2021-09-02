import React, {useEffect} from 'react';
import {AppRootStateType} from "../../app/Store";
import {CardsStateType, getCards} from "./CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {CardsTable} from "../../commonComponents/EditableTable/CardsTable";
import {CardsType} from "../../api/CardsAPI";
import {useParams} from "react-router-dom";

type PropsType = {
    cards: CardsType[]
}

export const Cards = (props: PropsType) => {

    if (!props.cards) {
        return <></>
    }

    return <><CardsTable cards={props.cards} packsCount={100}/></>
}

export const CardsContainer = () => {
    const {pack_id} = useParams<{ pack_id: string }>()
    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCards({cardsPack_id: pack_id}));
    }, [dispatch]);

    return <Cards cards={cards[pack_id]}/>
}

