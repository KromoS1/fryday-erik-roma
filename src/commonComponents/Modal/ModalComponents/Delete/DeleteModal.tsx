import React, {FC} from 'react';
import style from './DeleteModal.module.scss'
import {Status} from "../../../../components/statusApp/StatusAppReducer";

interface DeleteModalPropsType {
    title: string
    appStatus: Status
    packName: string | undefined
    deletePack: () => void
    cancelModal: ()=> void
}

export const DeleteModal: FC<DeleteModalPropsType> = props => {
    return (
        <>
            <div className={style.header}>
                <div className={style.title}>{props.title}</div>
                <span className={style.close} onClick={props.cancelModal}></span>
            </div>
            <div className={style.infoMessage}>
                Do you really want to remove <b>{props.packName}</b>?<br/>
                All cards will be excluded from this course.
            </div>
            <div className={style.buttons}>
                <button
                    className={props.appStatus === 'load' ? style.btnDisabled : style.btnCancel}
                    disabled={props.appStatus === 'load'}
                    onClick={() => props.cancelModal()}
                >Cancel</button>
                <button
                    className={props.appStatus === 'load' ? style.btnDisabled : style.btnDelete}
                    disabled={props.appStatus === 'load'}
                    onClick={() => props.deletePack()}
                >Delete</button>
            </div>
        </>
    )
};