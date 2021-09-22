import {authApi} from '../../api/AuthAPI';
import {AppThunkType} from '../../app/Store';
import {setIsAuth} from '../login/LoginReducer';
import {setIsInit, setStatusApp} from "../statusApp/StatusAppReducer";
import {ProfileType} from "./ProfileContainer";
import {ValueEdit} from "../EditProfile/EditProfile";

export type ProfileReducerAT =
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setStatusProfile>

export const setUserData = (userData: ProfileType) => ({type: 'PROFILE/SET_USER_DATA', payload: {...userData}} as const);
export const setStatusProfile = (status:string) => ({type:'PROFILE/SET-STATUS-PROFILE',status} as const);

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

export const initializeApp = (): AppThunkType => async dispatch => {
    try {
        if (!InitialState._id) {
            const me = await authApi.me();
            if (me) {
                dispatch(setUserData(me));
                dispatch(setIsAuth(true));
            }
        }
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
        dispatch(setIsInit(true));
    }
}

export const editProfileData = (values:ValueEdit):AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try{
        const profile = await authApi.edit(values);
        dispatch(setUserData(profile));
    }catch (error) {
        dispatch(setStatusApp('error', error.message));
    }finally {
        dispatch(setStatusApp('idle', ''));
    }
}