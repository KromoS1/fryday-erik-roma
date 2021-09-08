import React, {FC} from 'react';
import style from './Modal.module.scss'

interface ModalPropsType {
    isShow: boolean
    backGroundOnClick: () => void
}

export const Modal: FC<ModalPropsType> = props => {

      if(!props.isShow) return null

    return (
        <>
            <div
                className={style.background}
                onClick={props.backGroundOnClick}
            />
            <div className={style.modal}>
                {props.children}
            </div>
        </>
    )
}