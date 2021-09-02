import React, {FC, memo, useState} from 'react';
import style from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {NavLink} from 'react-router-dom';
import {logoutAccount} from "../login/LoginReducer";

export const Header: FC = memo(() => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);

    const setActivePack = () => {
        setIsHover(!isHover)
    }

    const logOutAcc = () => {
        dispatch(logoutAccount())
    }

    return (
        <div className={style.container}>
            <div className={style.title}>
                <div>It-Incubator</div>
            </div>
            <div className={style.navBar}>
                <NavLink to={'/packs'} className={isHover ? style.navActive : style.navInactive}
                         onClick={() => setActivePack()}>
                    Packs List
                </NavLink>
                <NavLink to={'/profile'} className={isHover ? style.navInactive : style.navActive}
                         onClick={() => setActivePack()}>
                    Profile
                </NavLink>
            </div>
            <div className={style.button}>
                {isAuth && <button className={style.btnLog} onClick={() => logOutAcc()}>Logout</button>}
            </div>
        </div>
    )
})