import {authApi, ParamsSetNewPasswordType} from "../../api/api";
import {AppThunkType} from "../../app/store";
import {redirectLogin} from "../utils/utils";

export const newPasswordReducerInitialState: NewPasswordReducerInitialStateTypes = {
    setPasswordStatus: false
}

export const newPasswordReducer =
    (state = newPasswordReducerInitialState, action: NewPasswordReducerActionTypes) => {
        switch(action.type) {
            case "PASSWORD/SET_CHANGED_STATUS": return {...state, setPasswordStatus: action.status}
            default: return state
        }
};


/* Action creators */
export const setNewPasswordStatus = (status: boolean) => ({type: 'PASSWORD/SET_CHANGED_STATUS', status} as const)

/* Thunk creators */
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
        })
}

/* Types */
export type NewPasswordReducerInitialStateTypes = {
    setPasswordStatus: boolean
}          //need to fix
export type NewPasswordReducerActionTypes = ReturnType<typeof setNewPasswordStatus>
//need to fix
