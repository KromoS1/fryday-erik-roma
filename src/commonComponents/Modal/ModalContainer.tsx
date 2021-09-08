import React, {FC, memo, useCallback} from 'react';
import {Modal} from "./Modal";

interface ModalContainerPropsType {
    isShow: boolean
    changeShowStatus: (showStatus: boolean) => void
}

export const ModalContainer: FC<ModalContainerPropsType> = memo(props => {

    const backGroundOnClick = useCallback(() => {
        props.changeShowStatus(false)
    },[])

    return (
        <>
            <Modal isShow={props.isShow} backGroundOnClick={backGroundOnClick}>
                {props.children}
            </Modal>
        </>
    )
})