import React, {FC, useEffect, useState} from 'react';
import {AppRootStateType} from "../../app/Store";
import {CardsStateType, getCards, updateGrade} from "../Cards/CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {CardsType, Grade} from "../../api/CardsAPI";
import {Button} from "antd";

type PropsType = {

}

const grades = [1,2,3,4,5];

const getCard = (cards: CardsType[]) => {

        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});

        return cards[res.id + 1];

};



export const LearningPage: FC<PropsType> = (props) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const cards = useSelector<AppRootStateType, CardsStateType>(state => state.cards);

    const {pack_id} = useParams<{pack_id: string}>();

    const [card, setCard] = useState<CardsType>({
        _id: 'fake',
        cardsPack_id: '',
        user_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        created: '',
        updated: '',
    });
    const dispatch = useDispatch();
    console.log(cards)
    useEffect(() => {
        if(first) {
            dispatch(getCards({cardsPack_id: pack_id}))
            setFirst(false);
        }
        console.log(cards)
        if (Object.keys(cards).length !== 0) {
            debugger
            getCard(cards[pack_id])
        }

        return () => {
            console.log('LearnContainer useEffect off');
        }

    }, [dispatch, pack_id,  first ])

    const onNext = () => {
        setIsChecked(false);
        if (cards) {
           dispatch(updateGrade(card._id, card.grade, {cardsPack_id: pack_id}))
            setCard(getCard(cards[pack_id]));
        } else {

        }
    }

    return (
        <div>
            LearnPage

            <div>{card.question}</div>
            <div>
                <Button onClick={() => setIsChecked(true)}>check</Button>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <Button key={'grade-' + i} onClick={() => {
                            setCard({...card, grade:g})
                        }}>{g}</Button>
                    ))}

                    <div><Button onClick={onNext}>next</Button></div>
                </>
            )}
        </div>
    );
}