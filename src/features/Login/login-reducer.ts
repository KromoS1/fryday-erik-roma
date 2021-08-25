import {AppThunkType} from '../../app/store';
import {authApi, ParamsAuthType} from '../../api/api';
import {setUserData} from '../Profile/profile-reducer';

export type LoginActionTypes =
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setIsInit>


type InitialStateTypes = {
    isAuth: boolean
    isInitialize: boolean
}

const InitialState: InitialStateTypes = {
    isAuth: false,
    isInitialize: false
}

export const setIsAuth = (isAuth: boolean) => ({type: 'LOGIN/SET_IS_AUTH', isAuth} as const)
export const setIsInit = (isInit: boolean) => ({type: 'LOGIN/SET_IS_INITIALIZE', isInit} as const)

export const loginReducer = (state = InitialState, action: LoginActionTypes): InitialStateTypes => {
    switch (action.type) {
        case 'LOGIN/SET_IS_AUTH':
            return {...state, isAuth: action.isAuth}
        case 'LOGIN/SET_IS_INITIALIZE':
            return {...state, isInitialize: action.isInit}
        default:
            return state
    }
}

export const loginAccount = (loginParams: ParamsAuthType): AppThunkType => dispatch => {
    authApi.login(loginParams)
        .then(res => {
            dispatch(setUserData(res.data));
            dispatch(setIsAuth(true));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            console.log(error);
        })
};

export const logoutAccount = (): AppThunkType => dispatch => {
    authApi.logout()
        .then(res => {
            if (res.data.info) {
                dispatch(setIsAuth(false));
            }
        })
}

export const initializeApp = (): AppThunkType => async dispatch => {
    authApi.me().then(res => {
        if (res._id) {
            dispatch(setIsAuth(true));
        }
    }).catch(e => {
        console.log(e.message);
    })
        .finally(() => {
            dispatch(setIsInit(true));
        })
}
