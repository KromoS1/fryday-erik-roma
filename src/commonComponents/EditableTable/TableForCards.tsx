import React from 'react';
import 'antd/dist/antd.css';
import {Space, Table} from 'antd';
import {PaginationProps} from "antd/lib/pagination/Pagination";
import {useDispatch} from "react-redux";
import {getPacks, PackType} from "../../components/Packs/PacksReducer";


export const TableForPacks = (props: {packs: PackType[]}) => {
    const dispatch = useDispatch();
    type packItemType = {
        key: string,
        name: string,
        cards: number,
        updated: string,
        created: string,
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: 'Cards',
            dataIndex: 'cards',
            key: 'cards',
        },
        {
            title: 'Last Update',
            dataIndex: 'updated',
            key: 'updated',
        },
        {
            title: 'Created by',
            key: 'created',
            dataIndex: 'created',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <a>Изменить</a>
                    <a>Удалить</a>
                </Space>
            ),
        },
    ];
    const paginationSettings: PaginationProps = {
        pageSize: 5,
        total: 2250,
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
            updated: i.updated.toString(),
            created: i.created.toString(),
        })
    })
    console.log(data)
    return <Table columns={columns} dataSource={data} pagination={{...paginationSettings, position: ['bottomCenter']}}/>
}