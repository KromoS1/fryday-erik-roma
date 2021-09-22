import React, {FC} from 'react';
import style from './Modal.module.scss'
import {InputModal} from "./ModalComponents/InputModal/InputModal";
import {DeleteModal} from "./ModalComponents/Delete/DeleteModal";
import {ModalType, Status} from "../../components/statusApp/StatusAppReducer";
import {ModalActionsType} from "./ModalContainer";

interface ModalPropsType {
    modal: ModalType
    modalActions: ModalActionsType
    appStatus: Status
}

export const Modal: FC<ModalPropsType> = props => {
    const setModal = () => {
        switch (props.modal.modalStatus) {
            case 'add-pack':
                return <InputModal
                    title={props.modal.modalTitle}
                    modalStatus={props.modal.modalStatus}
                    appStatus={props.appStatus}
                    actions={props.modalActions.addNewPack}
                    cancelModal={props.modalActions.cancelModal}
                />
            case 'add-card':
                return <InputModal
                    title={props.modal.modalTitle}
                    modalStatus={props.modal.modalStatus}
                    appStatus={props.appStatus}
                    actions={props.modalActions.addNewCard}
                    cancelModal={props.modalActions.cancelModal}
                />
            case 'update':
                return <InputModal
                    title={props.modal.modalTitle}
                    packName={props.modal.itemName}
                    modalStatus={props.modal.modalStatus}
                    appStatus={props.appStatus}
                    actions={props.modalActions.updatePack}
                    cancelModal={props.modalActions.cancelModal}
                />
            case 'delete':
                return <DeleteModal
                    appStatus={props.appStatus}
                    title={props.modal.modalTitle}
                    packName={props.modal.itemName}
                    deletePack={props.modalActions.deletePack}
                    cancelModal={props.modalActions.cancelModal}
                />
            default:
                return <></>
        }
    }

    if (!props.modal.isShow) return null

    return (
        <>
            <div className={style.background} onClick={props.modalActions.backGroundOnClick}/>
            <div className={style.modal}>
                {setModal()}
            </div>
        </>
    )
}