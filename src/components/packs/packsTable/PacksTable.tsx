import React, {useState, MouseEvent, memo} from 'react';
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
import {ModalContainer} from "../../../commonComponents/Modal/ModalContainer";
import {DeleteModal} from "../../../commonComponents/Modal/ModalComponents/Delete/DeleteModal";
import {InputModal} from "../../../commonComponents/Modal/ModalComponents/InputModal/InputModal";

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

export const PacksTable = memo((props: PropsType) => {
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
            title: 'Cards',
            dataIndex: 'cards',
            key: 'cards',
            sorter: (a: PackItemType, b: PackItemType) => a.cards - b.cards
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
            render: (data: PackItemType) =>
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

    return <>
        <Table columns={columns}
               dataSource={data}
               pagination={
                   {
                       ...getPaginationSettings(props.packsCount, (page: number) => {
                           getPacksForTable(page)
                       }),
                       position: ['bottomCenter']
                   }}/>
        <ModalContainer isShow={isShow} changeShowStatus={changeShowStatus}>
            {
                setting === "delete" ? <DeleteModal/> :
                    setting === "update" ? <InputModal/> : null
            }
        </ModalContainer>
    </>
})