import React, {FC, useState} from "react";
import style from "../InputModal/InputModal.module.scss";
import {Input} from "antd";
import {ModalStatus} from "../../../../components/statusApp/StatusAppReducer";

interface InputModalPropsType {
    title: string
    packName?: string
    status: ModalStatus
    actions: (name: string, answer?: string) => void
    cancelModal: () => void
}

export const InputModal: FC<InputModalPropsType> = props => {

    const changeInputValue = () => {
        if (props.status === "update" && props.packName) {
            return props.packName
        } else {
            return ''
        }
    }

    const [value, setValue] = useState<string>(changeInputValue())
    const [answer, setAnswer] = useState<string>('')

    return (
        <>
            <div className={style.title}>{props.title}</div>
            <div className={style.input}>
                {props.status === 'add-card' ? <div>
                        <Input
                            autoFocus
                            placeholder={"Enter question"}
                            value={props.packName}
                            size={"large"}
                            onChange={e => setValue(e.currentTarget.value)}/>
                        <Input
                            autoFocus
                            placeholder={"Enter answer"}
                            value={props.packName}
                            size={"large"}
                            onChange={e => setAnswer(e.currentTarget.value)}/>
                    </div>
                    :
                    <Input
                        autoFocus
                        placeholder={"Enter new item name"}
                        value={props.packName}
                        size={"large"}
                        onChange={e => setValue(e.currentTarget.value)}/>
                }

            </div>
            <div className={style.buttons}>
                <button className={style.btnCancel}
                        onClick={() => props.cancelModal()}>
                    Cancel
                </button>
                <button className={style.btnSave}
                        onClick={() => props.actions(value, answer)}>
                    Save
                </button>
            </div>
        </>
    )
}