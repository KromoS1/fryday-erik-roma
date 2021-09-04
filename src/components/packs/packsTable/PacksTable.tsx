import React from 'react';
import 'antd/dist/antd.css';
import {Button, Space, Table} from 'antd';
import {useDispatch} from "react-redux";
import {getPacks, PackType} from "../PacksReducer";
import {
    DateMaker,
    getPaginationSettings,
    getSortedDateIntoColumns,
    getSortedStringsDataColumns
} from "../../utils/Utils";
import {NavLink} from 'react-router-dom';
import {ComponentNameType} from "../PacksPage";
import {DataRequestType} from "../../../app/requestDataReducer";

type PropsType = ComponentNameType & {
    dataParams: DataRequestType
    packs: PackType[],
    packsCount: number
    meID?: string
    remove: (id: string) => void
};
export type PackItemType = {
    key: string,
    name: string,
    cards: number,
    updated: string,
    created: string,
};

export const PacksTable = (props: PropsType) => {
    const dispatch = useDispatch();
    const getPacksForTable = (page: number) => {
        props.meID
            ? dispatch(getPacks({...props.dataParams, page: page, pageCount: 5, user_id: props.meID}))
            : dispatch(getPacks({...props.dataParams, page: page, pageCount: 5,}))
    }

    const data: PackItemType[] = [];
    props.packs.forEach(i => {
        data.push({
            key: i._id,
            name: i.name,
            cards: i.cardsCount,
            updated: (DateMaker(i.updated)).toString(),
            created: (DateMaker(i.created)).toString(),
        })
    });

    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (data: PackItemType) => {
                if (props.name === 'packs') return <><NavLink to={`/packs/cards/${data.key}`}>{data.name}</NavLink></>
                if (props.name === 'profile') return <><NavLink to={`/cards/${data.key}`}>{data.name}</NavLink></>
            },
            sorter: getSortedStringsDataColumns,
        },
        {
            title: 'Cards count',
            dataIndex: 'cards',
            key: 'cards',
            sorter: (a: PackItemType, b: PackItemType) => a.cards - b.cards
        },
        {
            title: 'Updated',
            dataIndex: 'updated',
            key: 'updated',
            sorter: getSortedDateIntoColumns
        },
        {
            title: 'Created',
            key: 'created',
            dataIndex: 'created',
            sorter: getSortedDateIntoColumns
        },
        {
            title: 'Action',
            key: 'action',
            render: (data: PackItemType) =>
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

    return <Table columns={columns}
                  dataSource={data}
                  pagination={
                      {
                          ...getPaginationSettings(props.packsCount, (page: number) => {
                              getPacksForTable(page)
                          }),
                          position: ['bottomCenter']
                      }}
                  onHeaderRow={(columns, index) => {
                      return {
                          onClick: (data: any) => {
                              const sortParams = data.target.outerText.split(' ').map((param: string, i:number) => {
                                return  i === 0 ? param.toLowerCase() :  param[0].toUpperCase() + param.slice(1)
                              }).join('')
                              if (props.dataParams.sortPacks === `0${sortParams}`) {
                                  dispatch(getPacks({sortPacks: `1${sortParams}`}))
                              }
                              else {
                                  dispatch(getPacks({sortPacks: `0${sortParams}`}))
                              }
                          }, // click header row
                      };
                  }}
    />

}