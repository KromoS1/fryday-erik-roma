import React, {FC} from 'react';
import style from './Modal.module.scss'

type ModalPropsType = {
    isShow: boolean
    backGroundOnClick: () => void
}

export const Modal: FC<ModalPropsType> = props => {
    const {
        isShow,
        backGroundOnClick
    } = props

    if(!isShow) return null

    return (
        <>
            <div
                className={style.background}
                onClick={backGroundOnClick}
            />
            <div className={style.modal}>
                {props.children}
            </div>
        </>
    )
}