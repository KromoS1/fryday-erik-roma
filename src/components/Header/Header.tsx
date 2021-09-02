import React, {FC, memo, useState} from 'react';
import style from './Header.module.scss'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";


export const Header: FC = memo(() => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)

    const [isPack, setIsPack] = useState(false);
    const [isProfile, setIsProfile] = useState(true);

    const setActivePack = () => {
        setIsPack(true)
        setIsProfile(false)
    }

    const setActiveProfile = () => {
        setIsProfile(true)
        setIsPack(false)
    }


    return (
        <div className={style.container}>
            <div className={style.title}>
                <div>It-Incubator</div>
            </div>
            <div className={style.navBar}>
                <button
                    className={isPack? style.navActive : style.navInactive}
                    onClick={() => setActivePack()}
                >
                    Packs List
                </button>
                <button
                    className={isProfile? style.navActive : style.navInactive}
                    onClick={() => setActiveProfile()}
                >
                    Profile
                </button>
            </div>
            <div className={style.button}>
                {isAuth && <button className={style.btnLog}>Logout</button>}
            </div>
        </div>
    )
})