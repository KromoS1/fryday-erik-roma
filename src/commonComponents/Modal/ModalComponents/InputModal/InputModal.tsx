import React, {FC} from "react";
import style from "../InputModal/InputModal.module.scss";
import {Input} from "antd";

export const InputModal: FC = props => {
    return (
        <>
            <div className={style.title}>Modal Title</div>
            <div className={style.input}>
                <Input placeholder={"Pack name"} size={"large"} />
            </div>
            <div className={style.buttons}>
                <button className={style.btnCancel}>Cancel</button>
                <button className={style.btnSave}>Save</button>
            </div>
        </>
    )
};