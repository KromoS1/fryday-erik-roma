import {authApi, ParamsSetNewPasswordType} from "../../api/AuthAPI";
import {AppThunkType} from "../../app/Store";
import {setStatusApp} from "../statusApp/StatusAppReducer";

export type NewPasswordTypes = {
    setPasswordStatus: boolean
}

export type NewPasswordAT = ReturnType<typeof setNewPasswordStatus>

const initialState: NewPasswordTypes = {
    setPasswordStatus: false
}

export const setNewPasswordStatus = (status: boolean) => ({type: 'PASSWORD/SET_CHANGED_STATUS', status} as const)

export const newPasswordReducer = (state = initialState, action: NewPasswordAT): NewPasswordTypes => {
    switch (action.type) {
        case "PASSWORD/SET_CHANGED_STATUS":
            return {...state, setPasswordStatus: action.status}
        default:
            return state
    }
}

export const setNewPassword = (params: ParamsSetNewPasswordType): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await authApi.setNewPassword(params);
        dispatch(setNewPasswordStatus(true));
    } catch (error) {
        dispatch(setStatusApp('error', error.message));
        dispatch(setNewPasswordStatus(false));
    } finally {
        dispatch(setNewPasswordStatus(false));
        dispatch(setStatusApp('idle', ''));
    }
}
