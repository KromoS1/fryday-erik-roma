import React, {memo} from 'react'
import {Profile} from './Profile';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';
import {logoutAccount} from '../Login/login-reducer';
import {ProfileType} from '../../api/api';


export const ProfileContainer = memo(() => {

    const dispatch = useDispatch();
    const profile = useSelector<AppRootStateType,ProfileType>(state => state.profile);
    const isAuth = useSelector<AppRootStateType,boolean>(state => state.login.isAuth);

    if (!isAuth){
        return <Redirect to={"/login"}/>
    }

    const logOut = () => {
        dispatch(logoutAccount());
    }

    return (
        <>
            <Profile profile={profile} logOut={logOut}/>
        </>
    )
});
