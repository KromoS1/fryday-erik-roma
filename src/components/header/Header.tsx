import React, {FC, memo, useCallback} from 'react';
import style from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {NavLink, useLocation} from 'react-router-dom';
import {logoutAccount} from "../login/LoginReducer";
import {Status} from "../statusApp/StatusAppReducer";

export const Header: FC = memo(() => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);
    const isLoad = useSelector<AppRootStateType, Status>(state => state.statusApp.status);
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
                {isLoad === 'load'
                    ? <>
                        <span className={styleForPath('/packs')}>Packs List</span>
                        <span className={styleForPath('/profile')}>Profile</span>
                    </>
                    : <>
                        <NavLink to={'/packs'} className={styleForPath('/packs')}>
                            Packs List
                        </NavLink>
                        <NavLink to={'/'} className={styleForPath('/profile')}>
                            Profile
                        </NavLink>
                    </>
                }
            </div>
            <div className={style.button}>
                {isAuth && <button className={style.btnLog} disabled={isLoad === 'load'}
                                   onClick={() => logOutAcc()}>Logout</button>}
            </div>
        </div>
    )
})