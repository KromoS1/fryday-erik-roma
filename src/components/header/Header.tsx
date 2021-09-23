import React, {FC, memo, useCallback} from 'react';
import style from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {NavLink, useLocation} from 'react-router-dom';
import {logoutAccount} from "../login/LoginReducer";

export const Header: FC = memo(() => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const dispatch = useDispatch();
    const location = useLocation();

    const logOutAcc = useCallback(() => {
        dispatch(logoutAccount())
    }, [dispatch]);

    const styleForPath = (path: string) => location.pathname.includes(path) ? style.navActive : style.navInactive

    return (
        <div className={style.container}>
            <div className={style.title}>
                <div>It-Incubator</div>
            </div>
            <div className={style.navBar}>
                <NavLink to={'/packs'} className={styleForPath('/packs')}>
                    Packs List
                </NavLink>
                <NavLink to={'/'} className={styleForPath('/profile')}>
                    Profile
                </NavLink>
            </div>
            <div className={style.button}>
                {isAuth && <button className={style.btnLog} onClick={() => logOutAcc()}>Logout</button>}
            </div>
        </div>
    )
})