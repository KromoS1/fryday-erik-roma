import React, {memo, useEffect} from 'react';
import {AppRootStateType} from "../../app/Store";
import {CardsStateType, getCards} from "./CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {CardsTable} from "../../commonComponents/EditableTable/CardsTable";
import {CardsType} from "../../api/CardsAPI";
import {useParams} from "react-router-dom";

interface PropsType {
    cards: CardsType[]
    pack_id: string
}

const Cards = memo((props: PropsType) => {
    if (!props.cards || props.cards.length === 0) {
        return <>
            <span>This pack is empty. Click add new card to fill this pack</span>
        </>
    }
    return <><CardsTable cards={props.cards} cardsCount={10} pack_id={props.pack_id}/></>
})

export const CardsContainer = memo(() => {
    const {pack_id} = useParams<{ pack_id: string }>()
    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCards({cardsPack_id: pack_id}));
    }, [dispatch,pack_id]);

    return <Cards cards={cards[pack_id]} pack_id={pack_id}/>
})