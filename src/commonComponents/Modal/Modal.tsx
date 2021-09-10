import React, {FC} from 'react';
import style from './Modal.module.scss'
import {InputModal} from "./ModalComponents/InputModal/InputModal";
import {DeleteModal} from "./ModalComponents/Delete/DeleteModal";
import {ModalStatus} from "../../components/statusApp/StatusAppReducer";

interface ModalPropsType {
    isShow: boolean
    modalStatus: ModalStatus
    itemName?: string
    addNewPack: (newPackName: string) => void
    addNewQuestion: (question: string) => void
    updatePack: (newPackName: string) => void
    backGroundOnClick: () => void
    deletePack: () => void
    cancelModal: () => void
}

export const Modal: FC<ModalPropsType> = props => {
    const setModal = () => {
        switch (props.modalStatus) {
            case 'add-pack':
                return <InputModal
                    status={props.modalStatus}
                    actions={props.addNewPack}
                    cancelModal={props.cancelModal}
                />
            case 'add-card':
                return <InputModal
                    status={props.modalStatus}
                    actions={props.addNewQuestion}
                    cancelModal={props.cancelModal}
                />
            case 'update':
                return <InputModal
                    status={props.modalStatus}
                    actions={props.updatePack}
                    cancelModal={props.cancelModal}
                />
            case 'delete':
                return <DeleteModal
                    packName={props.itemName}
                    deletePack={props.deletePack}
                    cancelModal={props.cancelModal}
                />
            default:
                return <></>
        }
    }

    if (!props.isShow) return null

    return (
        <>
            <div className={style.background} onClick={props.backGroundOnClick}/>
            <div className={style.modal}>
                {setModal()}
            </div>
        </>
    )
}