import React, {FC, memo} from 'react';
import {Modal} from "./Modal";

type ModalContainerPropsType = {
    isShow: boolean
    changeShowStatus: (showStatus: boolean) => void
}

export const ModalContainer: FC<ModalContainerPropsType> = memo(props => {

    const{
        isShow,
        changeShowStatus
    } = props

    const backGroundOnClick = () => {
        changeShowStatus(false)
    }

    return (
        <>
            <Modal
                isShow={isShow}
                backGroundOnClick={backGroundOnClick}
            >
                {props.children}
            </Modal>
        </>
    )
})