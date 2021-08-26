import React, {FC, memo} from 'react'
import {Form} from "antd";
import style from "../RecoveryPassword/RecoveryPasswordStyle.module.scss";
import {fieldComponent} from "../CommonComponentsForm/FieldComponent";
import {formItemLayout} from "../Registration/Registration";
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {recoveryPassword} from "./recovery-password-reducer";
import {RecoveryMessage} from "../utils/utils";

interface ValuesType {
    email: string
}

type PropsType = {
    onSubmit: (data: ValuesType) => void
}

export const FormRecoveryPassword: FC<PropsType> = props => {

    const [form] = Form.useForm();

    const onFinish = (values: ValuesType) => {
        props.onSubmit(values);
    };

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
}

export const RecoveryPassword: FC = memo(() => {
    const isSend = useSelector<AppRootStateType, boolean>(state => state.recovery.isSend)

    const dispatch = useDispatch();

    const sendData = (data: ValuesType) => {
        debugger
        dispatch(recoveryPassword({
            email: data.email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: RecoveryMessage()
        }))
    }
    if(isSend){
        return <Redirect to={'/chek-email'}/>
    }

    return (
        <>
            <FormRecoveryPassword onSubmit={sendData}/>
        </>
    )
})