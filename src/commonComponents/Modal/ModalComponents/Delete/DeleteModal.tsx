import React, {FC} from 'react';
import style from './DeleteModal.module.scss'

interface DeleteModalPropsType {
    title: string
    packName: string | undefined
    deletePack: () => void
    cancelModal: ()=> void
}

export const DeleteModal: FC<DeleteModalPropsType> = props => {
    return (
        <>
            <div className={style.title}>{props.title}</div>
            <div className={style.infoMessage}>
                Do you really want to remove {props.packName}
                All cards will be excluded from this course.
            </div>
            <div className={style.buttons}>
                <button
                    className={style.btnCancel}
                    onClick={() => props.cancelModal()}
                >Cancel</button>
                <button
                    className={style.btnDelete}
                    onClick={() => props.deletePack()}
                >Delete</button>
            </div>
        </>
    )
};