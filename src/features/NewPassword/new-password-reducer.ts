import {authApi, ParamsSetNewPasswordType} from "../../api/api";
import {AppThunkType} from "../../app/store";
import {redirectLogin} from "../utils/utils";

export type NewPasswordTypes = {
    setPasswordStatus: boolean
}

export type NewPasswordAT = ReturnType<typeof setNewPasswordStatus>

const initialState: NewPasswordTypes = {
    setPasswordStatus: false
}

export const setNewPasswordStatus = (status: boolean) => ({type: 'PASSWORD/SET_CHANGED_STATUS', status} as const)

export const newPasswordReducer = (state = initialState, action: NewPasswordAT): NewPasswordTypes => {
        switch(action.type) {
            case "PASSWORD/SET_CHANGED_STATUS": return {...state, setPasswordStatus: action.status}
            default: return state
        }
}

export const setNewPassword = (params: ParamsSetNewPasswordType): AppThunkType => dispatch => {
    console.log(params)
    authApi.setNewPassword(params)
        .then( res => {
            if (res){
                dispatch(setNewPasswordStatus(true));
                redirectLogin(); //todo редирект в thunk не работает
            }
        })
        .catch(err => {
            const errMessage =  err.response ?  `${err.message} \n ${err.response.data.error}` : 'some error has occurred';
            dispatch(setNewPasswordStatus(false));
            console.log(errMessage);
        })
}
