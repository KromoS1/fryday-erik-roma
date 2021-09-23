import React, {FC, useState} from "react";
import style from "../InputModal/InputModal.module.scss";
import {Input} from "antd";
import {ModalStatus} from "../../../../components/statusApp/StatusAppReducer";

interface InputModalPropsType {
    status: ModalStatus
    actions: (name: string) => void
    cancelModal: ()=> void
}

export const InputModal: FC<InputModalPropsType> = props => {
    const [name, setName] = useState<string>("")
    const modalTitle = props.status === 'add-pack' ? 'Add new pack' : props.status === 'add-card' ? 'Add new card' : ''

    return (
        <>
            <div className={style.title}>{modalTitle}</div>
            <div className={style.input}>
                <Input placeholder={"Enter"} size={"large"} autoFocus onChange={e => setName(e.currentTarget.value)}/>
            </div>
            <div className={style.buttons}>
                <button className={style.btnCancel}
                    onClick={() => props.cancelModal()}>
                    Cancel
                </button>
                <button className={style.btnSave}
                        onClick={() => props.actions(name)}>
                    Save
                </button>
            </div>
        </>
    )
}