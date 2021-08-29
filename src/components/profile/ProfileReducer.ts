import {authApi} from '../../api/AuthAPI';
import {AppThunkType} from '../../app/Store';
import {setIsAuth} from '../login/LoginReducer';
import {setStatusApp} from "../statusApp/StatusAppReducer";
import {ProfileType} from "./ProfileContainer";

export type ProfileReducerAT =
    | ReturnType<typeof setUserData>

export const setUserData = (userData: ProfileType) =>
    ({type: 'PROFILE/SET_USER_DATA', payload: {...userData}} as const)

const InitialState: ProfileType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    rememberMe: false,
    verified: true,
}

export const profileReducer = (state = InitialState, action: ProfileReducerAT) => {
    switch (action.type) {
        case 'PROFILE/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const meProfile = (): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await authApi.me();
        dispatch(setIsAuth(true));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

