import React, {FC, memo, useCallback} from 'react'
import {Form} from 'antd';
import style from './LoginStyle.module.scss';
import {FieldComponent} from '../../commonComponents/commonComponentsForm/FieldComponent';
import {formItemLayout} from '../registration/Registration';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loginAccount} from "./LoginReducer";
import {AppRootStateType} from "../../app/Store";
import {Status} from "../statusApp/StatusAppReducer";

interface ValuesType {
    email: string
    password: string
}

interface PropsType {
    status: Status
    onSubmit: (data: ValuesType) => void
}

const LoginForm: FC<PropsType> = memo(props => {

    const [form] = Form.useForm();

    const onFinish = useCallback((values: ValuesType) => {
        props.onSubmit(values);
    }, [props]);

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
                        {props.status === 'load'
                            ? <span>Forgot Password</span>
                            : <NavLink to={'/recovery-password'}>Forgot Password</NavLink>
                        }
                    </span>
                    </div>
                    <div className={style.buttons}>
                        <button className={style.btnLogin} type="submit" disabled={props.status === 'load'}>
                            Login
                        </button>
                    </div>
                    <div className={style.signUp}>
                        <span>Don't have an account?</span>
                        {props.status === 'load'
                            ? <span>Sign Up</span>
                            : <NavLink to={"/registration"}>Sign Up</NavLink>
                        }
                    </div>
                </Form>
            </div>
        </div>
    )
})

export const Login: FC = memo(() => {
        const dispatch = useDispatch();
        const status = useSelector<AppRootStateType, Status>(state => state.statusApp.status);

        const submit = useCallback((data: ValuesType) => {
            dispatch(loginAccount({...data}));
        }, [dispatch]);

        return (
            <>
                <LoginForm onSubmit={submit} status={status}/>
            </>
        )
    }
)