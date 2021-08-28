import {AppThunkType} from '../../app/Store';
import {authApi, ParamsAuthType} from '../../api/Api';
import {setUserData} from '../profile/ProfileReducer';
import {setIsInit, setStatusApp} from "../statusApp/StatusAppReducer";

export type LoginAT =
    | ReturnType<typeof setIsAuth>

export type LoginType = {
    isAuth: boolean
}

const initialState: LoginType = {
    isAuth: false,
}

export const setIsAuth = (isAuth: boolean) => ({type: 'LOGIN/SET_IS_AUTH', isAuth} as const);

export const loginReducer = (state = initialState, action: LoginAT): LoginType => {
    switch (action.type) {
        case 'LOGIN/SET_IS_AUTH':
            return {...state, isAuth: action.isAuth}
        default:
            return state
    }
}

export const loginAccount = (loginParams: ParamsAuthType): AppThunkType => dispatch => {
    dispatch(setStatusApp('load'));
    authApi.login(loginParams)
        .then(res => {
            dispatch(setUserData(res.data));
            dispatch(setIsAuth(true));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
            console.log(error);
        }).finally(() => {
        dispatch(setStatusApp('idle'));
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
    try {
        const me = await authApi.me();
        if (me) {
            dispatch(setUserData(me));
            dispatch(setIsAuth(true));
        } else {
            console.log('error')
        }
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(setIsInit(true));
    }
}