import React, {FC, memo} from 'react'
import {Redirect, useParams} from "react-router-dom";
import {setNewPassword} from "./new-password-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Form} from "antd";
import style from './NewPasswordStyle.module.scss'
import {fieldComponent} from "../CommonComponentsForm/FieldComponent";
import {formItemLayout} from "../Registration/Registration";

interface NewPasswordValuesType {
    password: string
    confirmPassword: string
}
type NewPasswordFormPropsType = {
    onSubmit: (data: NewPasswordValuesType) => void
}

export const NewPasswordForm: FC<NewPasswordFormPropsType> = memo(({onSubmit}) => {
    const [form] = Form.useForm();

    const onFinish = (values: NewPasswordValuesType) => {
       onSubmit(values);
    };
    return (
        <div className={style.newPasswordMain}>
            <div className={style.title}>Cards</div>
            <div className={style.titleName}>
                <h3>Create new password</h3>
                {/*todo разобраться с размерами*/}
            </div>
            <Form name={'newPassword'}
                  className={style.form}
                  form={form}
                  onFinish={onFinish}
                  {...formItemLayout}
            >
                {fieldComponent('password', 'Password')}
                {fieldComponent('confirm', 'Confirm Password')}
                <div className={style.buttons}>
                    <button className={style.btnSetPass} type="submit">
                        Create new password
                    </button>
                </div>
            </Form>
        </div>
    )
})

export const NewPasswordComponent: FC = memo(() => {
    const dispatch = useDispatch();
    const { token } = useParams<{token: string}>();
    const changePasswordStatus = useSelector<AppRootStateType, boolean>(state => state.creatingPasswordInfo.setPasswordStatus);

    if (changePasswordStatus) {
        return <Redirect to={"/login"}/>
    }

    const submit = (data: NewPasswordValuesType) => {
        let {password} = data;
       dispatch(setNewPassword({password, resetPasswordToken: token}));
    }
    return (
        <>
            <NewPasswordForm onSubmit={submit}/>
        </>
    )
})