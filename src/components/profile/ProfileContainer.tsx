import React, {memo} from 'react'
import {Profile} from './Profile';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/Store';
import {Redirect} from 'react-router-dom';
import {logoutAccount} from '../login/LoginReducer';
import { StatusApp } from '../statusApp/StatusAppReducer';
import {alertMessage} from "../utils/Utils";
import {Header} from "../Header/Header";

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
    const meID = useSelector<AppRootStateType,string>(state => state.profile._id);
    const statusApp = useSelector<AppRootStateType,StatusApp>(state => state.statusApp);

    alertMessage(statusApp.status,statusApp.message);

    if (!isAuth){
        return <Redirect to={"/login"}/>
    }

    const logOut = () => {
        dispatch(logoutAccount());
    }

    return (
        <>
            <Profile profile={profile} logOut={logOut} meID={meID} name={'profile'}/>
        </>
    )
});


