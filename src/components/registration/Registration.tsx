import React, {FC, memo, useCallback} from 'react';
import style from './RegistrationStyle.module.scss'
import {Form} from 'antd';
import 'antd/dist/antd.css';
import {FieldComponent} from '../../commonComponents/commonComponentsForm/FieldComponent';
import {useDispatch} from 'react-redux';
import {getRegistration} from "./RegistrationReducer";

interface ValuesType {
    email: string
    password: string
    confirmPassword: string
}

interface PropsType {
    onSubmit: (data: ValuesType) => void
}


export const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
};

const FormRegistration: FC<PropsType> = memo(({onSubmit}) => {

    const [form] = Form.useForm();

    const onFinish = useCallback((values: ValuesType) => {
        onSubmit(values);
    },[onSubmit]);

    return (
        <div className={style.registration}>
            <div className={style.title}>Cards</div>
            <div className={style.titleName}>
                <h3>Sign Up</h3>
            </div>
            <Form name={'register'}
                  className={style.form}
                  {...formItemLayout}
                  form={form}
                  onFinish={onFinish}>
                {FieldComponent('email', 'E-mail')}
                {FieldComponent('password', 'Password')}
                {FieldComponent('confirm', 'Confirm Password')}
                <div className={style.buttons}>
                    <button className={style.btnReg} type="submit">
                        Register
                    </button>
                </div>
            </Form>
        </div>
    )
})

export const Registration = memo(() => {
    const dispatch = useDispatch();

    const sendData = useCallback((data: ValuesType) => {
        let {email,password} = data;
        dispatch(getRegistration({email,password}))
    },[dispatch]);

    return (
        <>
            <FormRegistration onSubmit={sendData}/>
        </>
    )
})