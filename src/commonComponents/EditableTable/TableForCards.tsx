import React from 'react';
import 'antd/dist/antd.css';
import {Button, Space, Table} from 'antd';
import {PaginationProps} from "antd/lib/pagination/Pagination";
import {useDispatch} from "react-redux";
import {getPacks, PackType} from "../../components/Packs/PacksReducer";
import {DateMaker} from "../../components/utils/Utils";

type PropsType = {
    packs: PackType[],
    packsCount: number
    remove: (id: string) => void
};
export type packItemType = {
    key: string,
    name: string,
    cards: number,
    updated: string,
    created: string,
};

export const TableForPacks = (props: PropsType) => {
    const dispatch = useDispatch();
    const getSortedDateIntoColumns =  (a: packItemType, b: packItemType) => {
            return new Date(a.created) > new Date(b.created) ? -1 : 1
        }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>,
            sorter: (a: packItemType, b: packItemType) => {
                return a.name > b.name ? -1 : 1
            },
        },
        {
            title: 'Cards',
            dataIndex: 'cards',
            key: 'cards',
            sorter: (a: packItemType, b: packItemType) => a.cards - b.cards
        },
        {
            title: 'Last Update',
            dataIndex: 'updated',
            key: 'updated',
            sorter: getSortedDateIntoColumns
        },
        {
            title: 'Created by',
            key: 'created',
            dataIndex: 'created',
            sorter: getSortedDateIntoColumns
        },
        {
            title: 'Action',
            key: 'action',
            render: (data: {
                cards: number
                created: string
                key: string
                name: string
                updated: string }) =>
                (
                <Space size="middle">
                    <Button onClick={() => console.log(data)}>Изменить</Button>
                    <Button type="primary" danger onClick={() => {
                        props.remove(data.key);
                    }}>Удалить</Button>
                </Space>
            ),
        },
    ];
    const paginationSettings: PaginationProps = {
        pageSize: 5,
        total: props.packsCount,
        onChange: (page: number) => {
            dispatch(getPacks({pageCount: 5, page}));
        },
        showSizeChanger: false,
    };

    const data: packItemType[] = [];
    props.packs.forEach( i => {
        data.push({
            key: i._id,
            name: i.name,
            cards: i.cardsCount,
            updated: (DateMaker(i.updated)).toString(),
            created: (DateMaker(i.created)).toString(),
        })
    });
    return <Table columns={columns} dataSource={data} pagination={{...paginationSettings, position: ['bottomCenter']}}/>
}