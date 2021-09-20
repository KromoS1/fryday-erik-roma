import React, {FC, useState} from "react";
import style from "../InputModal/InputModal.module.scss";
import {Input} from "antd";
import {ModalStatus, Status} from "../../../../components/statusApp/StatusAppReducer";

interface InputModalPropsType {
    title: string
    packName?: string
    modalStatus: ModalStatus
    appStatus: Status
    actions: (name: string, answer?: string) => void
    cancelModal: () => void
}

export const InputModal: FC<InputModalPropsType> = props => {

    const changeInputValue = () => {
        if (props.modalStatus === "update" && props.packName) {
            return props.packName
        } else {
            return ''
        }
    }

    const [value, setValue] = useState<string>(changeInputValue())

    const [answer, setAnswer] = useState<string>('')

    return (
        <>
            <div className={style.header}>
                <div className={style.title}>{props.title}</div>
                <span className={style.close} onClick={props.cancelModal}></span>
            </div>
            <div className={style.input}>
                {props.modalStatus === 'add-card' ? <div>
                        <Input
                            autoFocus
                            disabled={props.appStatus === 'load'}
                            placeholder={"Enter question"}
                            value={value}
                            size={"large"}
                            onChange={e => setValue(e.currentTarget.value)}/>
                        <Input
                            autoFocus
                            disabled={props.appStatus === 'load'}
                            placeholder={"Enter answer"}
                            value={answer}
                            size={"large"}
                            onChange={e => setAnswer(e.currentTarget.value)}/>
                    </div>
                    :
                    <Input
                        autoFocus
                        disabled={props.appStatus === 'load'}
                        placeholder={"Enter new pack name"}
                        value={value}
                        size={"large"}
                        onChange={e => setValue(e.currentTarget.value)}/>
                }

            </div>
            <div className={style.buttons}>
                <button className={props.appStatus === 'load' ? style.btnDisabled : style.btnCancel}
                        disabled={props.appStatus === 'load'}
                        onClick={() => props.cancelModal()}>
                    Cancel
                </button>
                <button className={props.appStatus === 'load' ? style.btnDisabled : style.btnSave}
                        disabled={props.appStatus === 'load'}
                        onClick={() => props.actions(value, answer)}>
                    Save
                </button>
            </div>
        </>
    )
}