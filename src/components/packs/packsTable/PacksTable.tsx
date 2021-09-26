import React, {memo, useCallback} from 'react';
import 'antd/dist/antd.css';
import {Button, Space, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from 'react-router-dom';
import {ComponentNameType} from "../PacksPage";
import {getPacks, PackType} from "../PacksReducer";
import {
    changeModalStatus,
    DateMaker,
    getPaginationSettings,
    getSortedDateIntoColumns,
    getSortedNumbersDataColumns,
    getSortedStringsDataColumns, sliceName
} from "../../utils/Utils";
import {AppRootStateType} from "../../../app/Store";
import {PackDataRequestType} from "../../../app/requestDataReducerPacks";
import {Status} from "../../statusApp/StatusAppReducer";

interface PropsType extends ComponentNameType {
    dataParams: PackDataRequestType
    packs: PackType[],
    packsCount: number
    meID?: string
    remove: (id: string) => void
}

export interface PackItemType {
    key: string,
    name: string,
    cardsCount: number,
    updated: string,
    created: string,
    user_id: string
}

export const PacksTable = memo((props: PropsType) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const meID = useSelector<AppRootStateType, string>(state => state.profile._id);
    const statusApp = useSelector<AppRootStateType,Status>(state => state.statusApp.status);

    const getPacksForTable = useCallback((page: number) => {
        props.meID
            ? dispatch(getPacks({...props.dataParams, page: page, pageCount: 5, user_id: props.meID}))
            : dispatch(getPacks({...props.dataParams, page: page, pageCount: 5,}))
    }, [dispatch, props.dataParams, props.meID]);

    const data: PackItemType[] = [];
    props.packs.forEach(i => {
        data.push({
            key: i._id,
            name: i.name,
            cardsCount: i.cardsCount,
            updated: (DateMaker(i.updated)).toString(),
            created: (DateMaker(i.created)).toString(),
            user_id: i.user_id
        })
    });

    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (data: PackItemType) => {
                if (props.name === 'packs') return <><NavLink
                    to={`/packs/cards/${data.key}`}>{sliceName(data.name)}</NavLink></>
                if (props.name === 'profile') return <><NavLink
                    to={`/profile/cards/${data.key}`}>{sliceName(data.name)}</NavLink></>
            },
            sorter: getSortedStringsDataColumns,
        },
        {
            title: 'cards',
            dataIndex: 'cardsCount',
            key: 'cardsCount',
            sorter: getSortedNumbersDataColumns,
        },
        {
            title: 'Updated',
            dataIndex: 'updated',
            key: 'updated',
            sorter: getSortedDateIntoColumns,
        },
        {
            title: 'Created',
            key: 'created',
            dataIndex: 'created',
            sorter: getSortedDateIntoColumns,

        },
        {
            title: 'Action',
            key: 'action',
            render: (data: PackItemType) =>
                (
                    <Space size="middle">
                        {data.user_id === meID && <>
                            <Button onClick={e => changeModalStatus(e, dispatch, data.key, data.name)}
                                    data-button={'update'}>Edit</Button>
                            <Button type="primary" danger
                                    onClick={e => changeModalStatus(e, dispatch, data.key, data.name)}
                                    data-button={'delete'}>Delete</Button></>}
                        <Button type="primary" onClick={() => {
                            history.push(`learn/${data.key}`)
                        }}>Learn</Button>
                    </Space>
                ),
        },
    ];

    return (
        <>
            <Table columns={columns}
                   dataSource={data}
                   loading={statusApp === 'load'}
                   showSorterTooltip={false}
                   pagination={
                       {
                           ...getPaginationSettings(props.packsCount, (page: number) => {
                               getPacksForTable(page)
                           }),
                           position: ['bottomCenter']
                       }}
                   onHeaderRow={() => {
                       return {
                           onClick: (data: any) => {
                               const indexOfColumn = columns.findIndex(e => e.title === data.target.outerText)
                               const sortParams = columns[indexOfColumn].key

                               if (props.dataParams.sortPacks === `0${sortParams}`) {
                                   dispatch(getPacks({sortPacks: `1${sortParams}`}))
                               } else {
                                   dispatch(getPacks({sortPacks: `0${sortParams}`}))
                               }
                           },
                       };
                   }}/>
        </>
    )
})
