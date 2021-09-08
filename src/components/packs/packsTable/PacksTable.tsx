import React, {useState, MouseEvent, useCallback, memo} from 'react';
import 'antd/dist/antd.css';
import {Button, Space, Table} from 'antd';
import {useDispatch} from "react-redux";
import {NavLink} from 'react-router-dom';
import {ComponentNameType} from "../PacksPage";
import {DataRequestType} from "../../../app/requestDataReducer";
import {getPacks, PackType} from "../PacksReducer";
import {
    DateMaker,
    getPaginationSettings,
    getSortedDateIntoColumns, getSortedNumbersDataColumns,
    getSortedStringsDataColumns
} from "../../utils/Utils";
import {ModalContainer} from "../../../commonComponents/Modal/ModalContainer";
import {DeleteModal} from "../../../commonComponents/Modal/ModalComponents/Delete/DeleteModal";
import {InputModal} from "../../../commonComponents/Modal/ModalComponents/InputModal/InputModal";

interface PropsType extends ComponentNameType {
    dataParams: DataRequestType
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
}

export const PacksTable = memo((props: PropsType) => {
    const dispatch = useDispatch();

    const [isShow, setIsShow] = useState<boolean>(false)
    const [setting, setSetting] = useState<string | undefined>("")

    const changeShowStatus = (showStatus: boolean, e?: MouseEvent<HTMLElement>) => {
        setIsShow(showStatus)
        let showSetting: string | undefined

        if (e) {
            showSetting = e.currentTarget.dataset.button
        }

        if (showSetting === "delete") {
            setSetting("delete")
        }
        if (showSetting === "update") {
            setSetting("update")
        }
    }

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
        })
    });

    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (data: PackItemType) => {
                if (props.name === 'packs') return <><NavLink to={`/packs/cards/${data.key}`}>{data.name}</NavLink></>
                if (props.name === 'profile') return <><NavLink
                    to={`/profile/cards/${data.key}`}>{data.name}</NavLink></>
            },
            sorter: getSortedStringsDataColumns,
        },
        {
            title: 'Cards',
            dataIndex: 'cardsCount',
            key: 'cardsCount',
            sorter: getSortedNumbersDataColumns
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
            render: () =>
                (
                    <Space size="middle">
                        <Button
                            onClick={e => changeShowStatus(true, e)}
                            data-button="update"
                        >
                            Update
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={e => changeShowStatus(true, e)}
                            data-button="delete"
                        >
                            Delete
                        </Button>
                    </Space>
                ),
        },
    ];

    return (
        <>
            <Table columns={columns}
                   dataSource={data}
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
            <ModalContainer isShow={isShow} changeShowStatus={changeShowStatus}>
                {
                    setting === "delete" ? <DeleteModal/> :
                        setting === "update" ? <InputModal/> : null
                }
            </ModalContainer>
        </>
    )
})
