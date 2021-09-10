import React, {memo, useEffect} from 'react';
import style from './AppStyle.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Store";
import {Preloader} from "../commonComponents/preloader/Preloader";
import {Route, Switch} from "react-router-dom";
import {authorizedRoutes, unauthorizedRoutes} from "../routes/Routes";
import {Header} from "../components/header/Header";
import {initializeApp} from "../components/profile/ProfileReducer";

export const App = memo(() => {
    const dispatch = useDispatch();
    const isInit = useSelector<AppRootStateType, boolean>(state => state.statusApp.isInitialize);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch])

    if (!isInit) {
        return <div><Preloader/></div>
    }

    if (!isAuth) {
        return (
            <div className={style.page}>
                <Switch>
                    {unauthorizedRoutes.map((route) => (
                        <Route key={route.name} {...route} />
                    ))}
                </Switch>
            </div>
        )
    }

    return (
        <div className={style.page}>
            <Header/>
            <Switch>
                {authorizedRoutes.map((route) => (
                    <Route key={route.name} {...route} />
                ))}
            </Switch>
        </div>
    )
})