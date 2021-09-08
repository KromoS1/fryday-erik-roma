import React, {FC} from 'react';
import style from './Modal.module.scss'
import {InputModal} from "./ModalComponents/InputModal/InputModal";
import {DeleteModal} from "./ModalComponents/Delete/DeleteModal";
import {ModalStatus} from "../../components/statusApp/StatusAppReducer";

type ModalPropsType = {
    modalStatus: ModalStatus
    itemName: string | undefined
    isShow: boolean
    addNewPack: (newPackName: string) => void
    updatePack: (newPackName: string) => void
    backGroundOnClick: () => void
    deletePack: () => void
    cancelModal: ()=> void
}

export const Modal: FC<ModalPropsType> = props => {
    const {
        modalStatus,
        isShow,
        itemName,
        backGroundOnClick,
        addNewPack,
        updatePack,
        deletePack,
        cancelModal
    } = props

    const setModal = () => {
        switch (modalStatus) {
            case "add":
                return <InputModal
                    status={modalStatus}
                    packActions={addNewPack}
                    cancelModal={cancelModal}
                />
            case "update":
                return <InputModal
                    status={modalStatus}
                    packActions={updatePack}
                    cancelModal={cancelModal}
                />
            case "delete":
                return <DeleteModal
                    packName={itemName}
                    deletePack={deletePack}
                    cancelModal={cancelModal}
                />
            default:
                return <></>
        }
    }

    if(!isShow) return null

    return (
        <>
            <div
                className={style.background}
                onClick={backGroundOnClick}
            />
            <div className={style.modal}>
                {setModal()}
            </div>
        </>
    )
}