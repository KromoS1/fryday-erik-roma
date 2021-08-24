import {authApi, ResponseMeType} from '../../api/api';
import {AppThunkType} from '../../app/store';
import {setIsAuth} from '../Login/login-reducer';


type InitialStateTypes = ResponseMeType

export type ProfileReducerActionTypes = | ReturnType<typeof setUserData>

export const setUserData = (userData: InitialStateTypes) =>
    ({type: 'PROFILE/SET_USER_DATA', payload: {...userData}} as const)

const InitialState: InitialStateTypes = {
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
    authApi.me().then(res => {
       if (res){
           dispatch(setIsAuth(true));
       }
    })
}

