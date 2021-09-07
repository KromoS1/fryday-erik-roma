import React, {FC, useState} from "react";
import style from "../InputModal/InputModal.module.scss";
import {Input} from "antd";
import {ModalStatus} from "../../../../components/statusApp/StatusAppReducer";

type InputModalPropsType = {
    status: ModalStatus
    packActions: (newPackName: string) => void
    cancelModal: ()=> void
}

export const InputModal: FC<InputModalPropsType> = props => {
    const [name, setName] = useState<string>("")

    const {
        status,
        packActions,
        cancelModal
    } = props

    const modalTitle = status === 'add' ? 'Add new pack' :
        status === 'update' ? 'Set new pack name' : ''

    return (
        <>
            <div className={style.title}>{modalTitle}</div>
            <div className={style.input}>
                <Input placeholder={"Pack name"} size={"large"} onChange={e => setName(e.currentTarget.value)}/>
            </div>
            <div className={style.buttons}>
                <button
                    className={style.btnCancel}
                    onClick={() => cancelModal()}
                >Cancel</button>
                <button
                    className={style.btnSave}
                    onClick={() => packActions(name)}
                >Save</button>
            </div>
        </>
    )
};