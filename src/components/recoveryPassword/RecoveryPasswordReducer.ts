import {AppThunkType} from "../../app/Store";
import {authApi, ParamsForgotType} from "../../api/AuthAPI";
import {setStatusApp} from "../statusApp/StatusAppReducer";

export interface RecoveryPasswordType {
    isSend: boolean
}

const InitialState: RecoveryPasswordType = {
    isSend: false
}

export type RecoveryPasswordAT =
    | ReturnType<typeof setSendStatus>

export const setSendStatus = (sendStatus: boolean) => ({type: "RECOVERY/SET_SEND_STATUS", sendStatus} as const)

export const recoveryPasswordReducer = (state = InitialState, action: RecoveryPasswordAT): RecoveryPasswordType => {
    switch (action.type) {
        case "RECOVERY/SET_SEND_STATUS":
            return {...state, isSend: action.sendStatus}
        default:
            return state
    }
};

export const recoveryPassword = (recoveryParams: ParamsForgotType): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        await authApi.forgot(recoveryParams);
        dispatch(setSendStatus(true));
    } catch (error) {
        if (error) {
            dispatch(setStatusApp('error', 'Email address not found.'));
        }
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}