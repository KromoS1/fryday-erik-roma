import React, {memo, useCallback} from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';
import {useDispatch} from "react-redux";
import {DateMaker, getPaginationSettings} from "../../components/utils/Utils";
import {CardsType} from "../../api/CardsAPI";
import {getCards} from "../../components/Cards/CardsReducer";

type PropsType = {
    cards: CardsType[],
    cardsCount: number,
    pack_id: string
};
export type cardsItemType = {
    key: string,
    question: string,
    answer: string,
    lastUpdate: string,
    grade: number,
};

export const CardsTable = memo((props: PropsType) => {
    const dispatch = useDispatch();
    console.log(props.cards)
    const getSortedDateIntoColumns =  useCallback((a: cardsItemType, b: cardsItemType) => {
        return new Date(a.lastUpdate) > new Date(b.lastUpdate) ? -1 : 1
    },[]);

    const getCardsForTable = useCallback((page: number) => {
        dispatch(getCards({pageCount: 5, cardsPack_id: props.pack_id, page}));
    },[props,dispatch]);

    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            render: (text: string) => <a href={'/'}>{text}</a>,
            sorter: (a: cardsItemType, b: cardsItemType) => {
                return a.question > b.question ? -1 : 1
            },
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
        },
        {
            title: 'Last Update',
            dataIndex: 'lastUpdate',
            key: 'lastUpdate',
            sorter: getSortedDateIntoColumns
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            sorter: (a: cardsItemType, b: cardsItemType) => {
                return a.grade > b.grade ? -1 : 1
            }
        },
    ];
    const data: cardsItemType[] = [];
    props.cards.forEach( i => {
        data.push({
            key: i._id,
            question: i.question,
            answer: i.answer,
            lastUpdate: (DateMaker(i.updated)).toString(),
            grade: Math.round(i.grade),
        })
    });
    return <Table
        columns={columns}
        dataSource={data}
        pagination={{...getPaginationSettings(props.cardsCount, getCardsForTable), position: ['bottomCenter']}}
        onHeaderRow={() => {
            return {
                onClick: (data: any) => {
                    const indexOfColumn = columns.findIndex(e => e.title === data.target.outerText)
                    const sortParams = columns[indexOfColumn].key
                    dispatch(getCards({cardsPack_id: props.pack_id, sortCards: `1${sortParams}`}))
                }
            }
        }}
    />
})