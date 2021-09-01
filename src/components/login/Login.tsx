import React, {FC, memo} from 'react'
import {Form} from 'antd';
import style from './LoginStyle.module.scss';
import {fieldComponent} from '../../commonComponents/commonComponentsForm/FieldComponent';
import {formItemLayout} from '../registration/Registration';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/Store';
import {loginAccount} from "./LoginReducer";
import {StatusApp} from "../statusApp/StatusAppReducer";
import {alertMessage} from "../utils/Utils";

interface ValuesType {
    email: string
    password: string
}

type PropsType = {
    onSubmit: (data: ValuesType) => void
}

const LoginForm: FC<PropsType> = props => {

    const [form] = Form.useForm();

    const onFinish = (values: ValuesType) => {
       props.onSubmit(values);
    };

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
                  {fieldComponent('email', 'E-mail')}
                  {fieldComponent('password', 'Password')}
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

}

export const Login: FC = memo(() => {

    const dispatch = useDispatch();
    const isAuth = useSelector<AppRootStateType,boolean>(state => state.login.isAuth);
    const statusApp = useSelector<AppRootStateType,StatusApp>(state => state.statusApp);

    alertMessage(statusApp.status,statusApp.message);

    if (isAuth){
        return <Redirect to={"/profile"}/>
    }

    const submit = (data: ValuesType) => {
        dispatch(loginAccount({...data,rememberMe:true}));
    }

    return (
        <>
            <LoginForm onSubmit={submit}/>
        </>
    )
})