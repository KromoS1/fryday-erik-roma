import React, {memo, useEffect} from 'react';
import {AppRootStateType} from "../../app/Store";
import {useDispatch, useSelector} from "react-redux";
import {CardsTable} from "../../commonComponents/editableTable/CardsTable";
import {CardsType} from "../../api/CardsAPI";
import {useParams} from "react-router-dom";
import {getCards} from "./CardsReducer";
import style from "../packs/PacksPage.module.scss";
import {SearchInput} from "../../commonComponents/serachInput/SearchInput";
import {changeModalStatus} from "../utils/Utils";

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
    return <>
        <CardsTable cards={props.cards} cardsCount={10} pack_id={props.pack_id}/>
    </>
})

export const CardsContainer = memo(() => {
    const {pack_id} = useParams<{ pack_id: string }>()
    const cards = useSelector<AppRootStateType, CardsType[]>(state => state.cards.cards);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCards({cardsPack_id: pack_id}));
    }, [dispatch, pack_id]);

    return (
        <>
            <div className={style.mainTitle}>Cards list</div>
            <div className={style.search}>
                <SearchInput/>
                <div className={style.addButton}>
                    <button
                        className={style.btnAdd}
                        onClick={e => changeModalStatus(e, dispatch, pack_id)}
                        data-button="add-card">
                        Add new card
                    </button>
                </div>
            </div>
            <Cards cards={cards} pack_id={pack_id}/>
        </>
    )
})