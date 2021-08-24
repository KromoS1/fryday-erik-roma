import React, {FC} from 'react';
import style from './RegistrationStyle.module.scss'
import {Form} from 'antd';
import 'antd/dist/antd.css';
import {fieldComponent} from '../CommonComponentsForm/FieldComponent';

interface ValuesType {
    email: string
    password: string
    confirmPassword: string
}

type PropsType = {
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


export const FormRegistration: FC<PropsType> = props => {

    const [form] = Form.useForm();

    const onFinish = (values: ValuesType) => {
        props.onSubmit(values);
    };

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
                {fieldComponent('email', 'E-mail')}
                {fieldComponent('password', 'Password')}
                {fieldComponent('confirm', 'Confirm Password')}
                <div className={style.buttons}>
                    <button className={style.btnCan}>
                        Cancel
                    </button>
                    <button className={style.btnReg} type="submit">
                        Register
                    </button>
                </div>
            </Form>
        </div>
    )
}


export const Registration = () => {

    const sendData = (data: ValuesType) => {
        console.log(data)
    }

    return (
        <>
            <FormRegistration onSubmit={sendData}/>
        </>
    )


}