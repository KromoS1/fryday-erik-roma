import React from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';
import {PaginationProps} from "antd/lib/pagination/Pagination";
import {useDispatch} from "react-redux";
import {getPacks} from "../../components/Packs/PacksReducer";
import {DateMaker} from "../../components/utils/Utils";
import {CardsType} from "../../api/CardsAPI";

type PropsType = {
    cards: CardsType[],
    packsCount: number
};
export type cardsItemType = {
    key: string,
    question: string,
    answer: string,
    lastUpdate: string,
    grade: number,
};

export const TableForCards = (props: PropsType) => {
    const dispatch = useDispatch();
    const getSortedDateIntoColumns =  (a: cardsItemType, b: cardsItemType) => {
        return new Date(a.lastUpdate) > new Date(b.lastUpdate) ? -1 : 1
    }
    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            render: (text: any) => <a>{text}</a>,
            sorter: (a: cardsItemType, b: cardsItemType) => {
                return a.question > b.question ? -1 : 1
            },
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
            sorter: (a: cardsItemType, b: cardsItemType) => {
                return a.answer > b.answer ? -1 : 1
            }
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
            grade: i.rating,
        })
    });
    const paginationSettings: PaginationProps = {
        pageSize: 5,
        total: props.packsCount,
        onChange: (page: number) => {
            dispatch(getPacks({pageCount: 5, page}));
        },
        showSizeChanger: false,
    };
    return <Table columns={columns} dataSource={data} pagination={{...paginationSettings, position: ['bottomCenter']}}/>
}