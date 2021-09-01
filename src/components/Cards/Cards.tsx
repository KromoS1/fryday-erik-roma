import React, {useEffect} from 'react';
import {AppRootStateType} from "../../app/Store";
import {getPacks} from "../Packs/PacksReducer";
import {CardsStateType, getCards} from "./CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {TableForCards} from "../../commonComponents/EditableTable/CardsTableComponent";
import {CardsType} from "../../api/CardsAPI";
import {useParams} from "react-router-dom";

type PropsType = {
    cards: CardsType[]
}

export const Cards = (props: PropsType) => {
    //'612e965e4721cb0004300eaf'   and empty '612e7f224721cb0004300ea6'

    debugger
    // return props.cards.length === 0 ? <div>This pack is empty click Add new pack</div> : <><TableForCards
    //     cards={props.cards} packsCount={100}/></>

    return (
        <></>
    )
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

