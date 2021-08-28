import {authApi, ResponseMeType} from '../../api/Api';
import {AppThunkType} from '../../app/Store';
import {setIsAuth} from '../login/LoginReducer';
import {setStatusApp} from "../statusApp/StatusAppReducer";

export type ProfileReducerActionTypes =
    | ReturnType<typeof setUserData>

export const setUserData = (userData: ResponseMeType) =>
    ({type: 'PROFILE/SET_USER_DATA', payload: {...userData}} as const)

const InitialState: ResponseMeType = {
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

export const profileReducer = (state = InitialState, action: ProfileReducerActionTypes) => {
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

export const meProfile = (): AppThunkType => dispatch => {
    dispatch(setStatusApp('load'));
    authApi.me().then(res => {
       if (res){
           dispatch(setIsAuth(true));
       }
    }).finally(() => {
        dispatch(setStatusApp('idle'));
    })
}

