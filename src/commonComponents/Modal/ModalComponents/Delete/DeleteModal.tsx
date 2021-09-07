import React, {FC} from 'react';
import style from './DeleteModal.module.scss'

type DeleteModalPropsType = {
    packName: string | undefined
    deletePack: () => void
    cancelModal: ()=> void
}

export const DeleteModal: FC<DeleteModalPropsType> = props => {
    const{
        packName,
        deletePack,
        cancelModal
    } = props
    return (
        <>
            <div className={style.title}>Delete Pack?</div>
            <div className={style.infoMessage}>
                Do you really want to remove {packName}
                All cards will be excluded from this course.
            </div>
            <div className={style.buttons}>
                <button
                    className={style.btnCancel}
                    onClick={() => cancelModal()}
                >Cancel</button>
                <button
                    className={style.btnDelete}
                    onClick={() => deletePack()}
                >Delete</button>
            </div>
        </>
    )
};