import {AppThunkType} from "../../app/store";
import {authApi, ParamsForgotType} from "../../api/api";

export type RecoveryPasswordType = {
    isSend: boolean
}

const InitialState: RecoveryPasswordType = {
    isSend: false
}

export type RecoveryPasswordAT =
    |ReturnType<typeof setSendStatus>

export const setSendStatus = (sendStatus: boolean) => ({type: "RECOVERY/SET_SEND_STATUS", sendStatus} as const)

export const recoveryPasswordReducer = (state = InitialState, action: RecoveryPasswordAT): RecoveryPasswordType => {
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