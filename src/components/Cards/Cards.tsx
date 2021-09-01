import React, {useEffect} from 'react';
import {AppRootStateType} from "../../app/Store";
import {getPacks} from "../Packs/PacksReducer";
import {CardsStateType, getCards} from "./CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {CardsTable} from "../../commonComponents/EditableTable/CardsTable";
import {CardsType} from "../../api/CardsAPI";
import {useParams} from "react-router-dom";

type PropsType = {
    cards: CardsType[]
}

export const Cards = (props: PropsType) => {

    return props.cards.length === 0 ? <div>This pack is empty click Add new pack</div> : <><CardsTable
        cards={props.cards} packsCount={100}/></>
}

export const CardsContainer = () => {
    const {token} = useParams<{ token: string }>()
    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCards({cardsPack_id:token}));
        dispatch(getPacks({page: 1, pageCount: 5}))
    }, [dispatch]);


    return <Cards cards={cards[token]}/>
}

