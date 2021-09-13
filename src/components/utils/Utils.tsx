import {Redirect} from 'react-router-dom';
import {setModalStatus, Status} from "../statusApp/StatusAppReducer";
import {message} from "antd";
import {PackItemType} from "../packs/packsTable/PacksTable";
import {PaginationProps} from "antd/lib/pagination/Pagination";
import {MouseEvent} from "react";
import {Dispatch} from "redux";

export const redirectLogin = () => {
    return <Redirect to={"/login"}/>
}

export const alertMessage = (status: Status, content: string) => {
    const key = "updatable";
    if (status === 'load') {
        message.loading({content: 'Loading...', key}).then(r => r);
    }
    if (status === "success") {
        message.success({content: content, key, duration: 2}).then(r => r);
    }
    if (status === 'error') {
        message.error({content, key, duration: 2}).then(r => r);
    }
};

export const RecoveryMessage = () => {
    return (
        `<div>
            <span>Follow the link to set a new password:</span>
            <a href="https://kromos1.github.io/fryday-erik-roma-pasha/#/set-new-password/$token$">click on the link to confirm your mail</a>
        </div>`
    )
}
export const DateMaker = (date: string) => {
    return `${new Date(date).getDate()}.${new Date(date).getMonth()}.${new Date(date).getFullYear()}`
}
export const getSortedDateIntoColumns = (a: PackItemType, b: PackItemType) => {
    return new Date(a.created) > new Date(b.created) ? -1 : 1
}

export const getPaginationSettings = function (totalAmount: number, changer: (data: number) => void): PaginationProps {
    return {
        pageSize: 5,
        total: totalAmount,
        onChange: changer,
        showSizeChanger: false,
    }
}
export const getSortedNumbersDataColumns = (a: PackItemType, b: PackItemType) => a.cardsCount - b.cardsCount;
export const getSortedStringsDataColumns = (a: PackItemType, b: PackItemType) => {
    return a.name > b.name ? -1 : 1
}

export const changeModalStatus = (e: MouseEvent<HTMLElement>, dispatch: Dispatch, itemID?: string, itemName?: string) => {
    const trigger: string | undefined = e.currentTarget.dataset.button
    if (trigger === 'delete') {
        dispatch(setModalStatus("delete", true, 'Delete Pack?' , itemID, itemName));
    }
    if (trigger === 'update') {
        dispatch(setModalStatus("update", true, 'Set new pack name', itemID));
    }
    if (trigger === 'add-pack') {
        dispatch(setModalStatus("add-pack", true, 'Add new pack'));
    }
    if (trigger === 'add-card') {

        dispatch(setModalStatus('add-card', true, 'Add new card', itemID));
    }
}

