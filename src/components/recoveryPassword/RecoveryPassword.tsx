import React, {FC, memo, useCallback, useState} from 'react'
import {Form} from "antd";
import style from ".//RecoveryPasswordStyle.module.scss";
import {fieldComponent} from "../../commonComponents/commonComponentsForm/FieldComponent";
import {formItemLayout} from "../registration/Registration";
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {recoveryPassword} from "./RecoveryPasswordReducer";
import {RecoveryMessage} from "../utils/Utils";

interface ValuesType {
    email: string
}

type PropsType = {
    onSubmit: (data: ValuesType) => void
}

export const FormRecoveryPassword: FC<PropsType> = memo(({onSubmit}) => {

    const [form] = Form.useForm();

    const onFinish = useCallback((values: ValuesType) => {
        onSubmit(values);
    },[onSubmit]);

    return (
        <div className={style.recoveryPassword}>
            <div className={style.title}>Cards</div>
            <div className={style.titleName}>
                <h3>Forgot your password?</h3>
            </div>
            <Form name={'forgot password'}
                  className={style.form}
                  {...formItemLayout}
                  form={form}
                  onFinish={onFinish}>
                {fieldComponent('email', 'E-mail')}
                <div className={style.subtitle}>
                    Enter your email address and we will send you future instructions
                </div>
                <div className={style.buttons}>
                    <button className={style.btnSend} type="submit">
                        Send Instructions
                    </button>
                </div>
                <div className={style.signUp}>
                    <span>Did you remember your password?</span>
                    <NavLink to={"/login"}>Try logging in</NavLink>
                </div>
            </Form>
        </div>
    )
})

export const RecoveryPassword: FC = memo(() => {
    const [userEmail, setUserEmail] = useState<string>('');
    const isSend = useSelector<AppRootStateType, boolean>(state => state.recovery.isSend);
    const dispatch = useDispatch();

    const sendData = useCallback((data: ValuesType) => {
        setUserEmail(data.email);
        dispatch(recoveryPassword({
            email: data.email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: RecoveryMessage()
        }))
    },[dispatch]);

    if(isSend){
        return <Redirect
            to={{
                pathname: "/chek-email",
                state: {userEmail}
            }}
        />
    }

    return (
        <>
            <FormRecoveryPassword onSubmit={sendData}/>
        </>
    )
})