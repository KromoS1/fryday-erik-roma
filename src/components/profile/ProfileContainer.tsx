import React, {memo} from 'react'
import {Profile} from './Profile';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/Store';
import {Redirect} from 'react-router-dom';
import {logoutAccount} from '../login/LoginReducer';
import {Status} from "../statusApp/StatusAppReducer";
import {Preloader} from "../../commonComponents/preloader/Preloader";

export type ProfileType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    avatar?: string
}

export const ProfileContainer = memo(() => {
    const dispatch = useDispatch();
    const profile = useSelector<AppRootStateType,ProfileType>(state => state.profile);
    const isAuth = useSelector<AppRootStateType,boolean>(state => state.login.isAuth);
    const statusApp = useSelector<AppRootStateType,Status>(state => state.statusApp.status);

    if (!isAuth){
        return <Redirect to={"/login"}/>
    }

    if (statusApp === 'load') return <Preloader/>

    const logOut = () => {
        dispatch(logoutAccount());
    }

    return (
        <>
            <Profile profile={profile} logOut={logOut}/>
        </>
    )
});
