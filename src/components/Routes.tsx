import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import {Error404} from './error404/Error404';
import {Login} from './login/Login';
import {Registration} from './registration/Registration';
import {NewPasswordComponent} from './newPassword/NewPassword';
import {RecoveryPassword} from './recoveryPassword/RecoveryPassword';
import {ProfileContainer} from './profile/ProfileContainer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../app/Store';
import {initializeApp} from './login/LoginReducer';
import {Preloader} from '../commonComponents/preloader/Preloader';
import {ChekEmail} from "./chekEmail/ChekEmail";

export const PATH = {
    LOGIN: '/login',
    PROFILE: '/profile',
    REGISTRATION: '/registration',
    NEW_PASSWORD: '/set-new-password/:token?',
    RECOVERY_PASSWORD: '/recovery-password',
    CHEK_EMAIL: '/chek-email',
    PACK: '/packs',
    CARDS: '/cards',
}

export const Routes = () => {
    const dispatch = useDispatch();
    const isInit = useSelector<AppRootStateType, boolean>(state => state.statusApp.isInitialize);

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch])

    if (!isInit) {
        return <div><Preloader/></div>
    }

    return (
        <>
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.PROFILE} render={() => <ProfileContainer/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.NEW_PASSWORD} render={() => <NewPasswordComponent/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} render={() => <RecoveryPassword/>}/>
                <Route path={PATH.CHEK_EMAIL} render={() => <ChekEmail/>}/>
                {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route render={() => <Error404/>}/>
            </Switch>
        </>
    );
};