import {authApi, ParamsAuthType} from '../../api/AuthAPI';
import {AppThunkType} from '../../app/Store';
import {redirectLogin} from '../utils/Utils';
import {setStatusApp} from "../statusApp/StatusAppReducer";

export interface RegistrationTypes {
    error: string | null
}

export type RegistrationAT = ReturnType<typeof setIsRegistered>

const InitialState: RegistrationTypes = {
    error: null
}

export const setIsRegistered = (isRegistered: boolean, error: string | null) =>
    ({type: 'REGISTRATION/GET_REGISTERED_REQUEST', error} as const);

export const registrationReducer = (state = InitialState, action: RegistrationAT): RegistrationTypes => {
    switch (action.type) {
        case "REGISTRATION/GET_REGISTERED_REQUEST": {
            return {...state, error: action.error}
        }
        default:
            return state;
    }
};

export const getRegistration = (params: ParamsAuthType): AppThunkType => async dispatch => {
    dispatch(setStatusApp('load', ''));
    try {
        const response = await authApi.registration(params)
        if (response) {
            redirectLogin();
        }
    } catch (error) {
        dispatch(setStatusApp('error', error.message))
        dispatch(setIsRegistered(false, error.message));
    } finally {
        dispatch(setStatusApp('idle', ''));
    }
}

