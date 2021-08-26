import {AppThunkType} from "../../app/store";
import {authApi, ParamsForgotType} from "../../api/api";

export const recoveryPasswordReducerInitialState: RecoveryPasswordReducerInitialStateTypes = {
    isSend: false
}

export type RecoveryPasswordReducerInitialStateTypes = {
    isSend: boolean
}
export type RecoveryPasswordReducerActionTypes =
    |ReturnType<typeof setSendStatus>

export const setSendStatus = (sendStatus: boolean) => ({type: "RECOVERY/SET_SEND_STATUS", sendStatus} as const)

export const recoveryPasswordReducer =
    (state = recoveryPasswordReducerInitialState, action: RecoveryPasswordReducerActionTypes) => {
        switch (action.type) {
            case "RECOVERY/SET_SEND_STATUS":
                return {...state, isSend: action.sendStatus}
            default:
                return state
        }
    };

export const recoveryPassword = (recoveryParams: ParamsForgotType): AppThunkType => dispatch => {
    authApi.forgot(recoveryParams)
        .then(res => {
            dispatch(setSendStatus(true))
        })
        .catch(err => {
            console.log(err)
        })
}