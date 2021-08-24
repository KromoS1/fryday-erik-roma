import React, {FC, memo} from 'react'
import {Form} from 'antd';
import style from './LoginStyle.module.scss';
import {fieldComponent} from '../CommonComponentsForm/FieldComponent';
import {formItemLayout} from '../Registration/Registration';
import {NavLink} from 'react-router-dom';

interface ValuesType {
    email: string
    password: string
}

type PropsType = {
    onSubmit: (data: ValuesType) => void
}

const LoginForm: FC<PropsType> = props => {

    const [form] = Form.useForm();

    const forgotPass = () => {
        console.log("Redirect on Page Forgot Password");
    }

    const onFinish = (values: ValuesType) => {
       props.onSubmit(values);
    };

    return (
        <div className={style.login}>
            <div className={style.title}>Cards</div>
            <div className={style.titleName}>
                <h3>Sign In</h3>
            </div>
            <Form name={'login'}
                  className={style.form}
                  {...formItemLayout}
                  form={form}
                  onFinish={onFinish}>
                {fieldComponent('email', 'E-mail')}
                {fieldComponent('password', 'Password')}
                <div className={style.forgot}>
                    <span onClick={() => forgotPass()}>Forgot Password</span>
                </div>
                <div className={style.buttons}>
                    <button className={style.btnLogin} type="submit">
                        Login
                    </button>
                </div>
                <div className={style.signUp}>
                    <span>Don't have an account?</span>
                    <NavLink to={"/registration"}>Sign Up</NavLink>
                </div>
            </Form>
        </div>
    )

}


export const Login: FC = memo(() => {

    const submit = (data: ValuesType) => {
        console.log(data)
    }

    return (
        <>
            <LoginForm onSubmit={submit}/>
        </>
    )
})