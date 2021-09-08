import React, {FC} from 'react';
import style from './DeleteModal.module.scss'


export const DeleteModal: FC = () => {
    return (
        <>
            <div className={style.title}>Delete Pack?</div>
            <div className={style.infoMessage}>
                Do you really want to remove Pack Name - Name Pack?
                All cards will be excluded from this course.
            </div>
            <div className={style.buttons}>
                <button className={style.btnCancel}>Cancel</button>
                <button className={style.btnDelete}>Delete</button>
            </div>
        </>
    )
};