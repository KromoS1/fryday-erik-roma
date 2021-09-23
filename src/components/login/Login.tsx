import React, {FC, memo, useCallback} from 'react'
import {Form} from 'antd';
import style from './LoginStyle.module.scss';
import {FieldComponent} from '../../commonComponents/commonComponentsForm/FieldComponent';
import {formItemLayout} from '../registration/Registration';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/Store';
import {loginAccount} from "./LoginReducer";
import {StatusApp} from "../statusApp/StatusAppReducer";
import {alertMessage} from "../utils/Utils";

interface ValuesType {
    email: string
    password: string
}

interface PropsType {
    onSubmit: (data: ValuesType) => void
}

const LoginForm: FC<PropsType> = memo(props => {

    const [form] = Form.useForm();

    const onFinish = useCallback((values: ValuesType) => {
        props.onSubmit(values);
    },[props]);

    return (
        <div className={style.login}>
            <div className={style.container}>
                <div className={style.title}>Cards</div>
                <div className={style.titleName}>
                    <h3>Sign In</h3>
                </div>
                <Form name={'login'}
                      className={style.form}
                      {...formItemLayout}
                      form={form}
                      onFinish={onFinish}>
                    {FieldComponent('email', 'E-mail')}
                    {FieldComponent('password', 'Password')}
                    <div className={style.forgot}>
                    <span>
                        <NavLink to={'/recovery-password'}>
                            Forgot Password
                        </NavLink>
                    </span>
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
        </div>
    )
})

export const Login: FC = memo(
    () => {
        const dispatch = useDispatch();
        const statusApp = useSelector<AppRootStateType,StatusApp>(state => state.statusApp);

        alertMessage(statusApp.status,statusApp.message);

        const submit = useCallback((data: ValuesType) => {
            dispatch(loginAccount({...data}));
        },[dispatch]);

        return (
            <>
                <LoginForm onSubmit={submit}/>
            </>
        )
    }
)