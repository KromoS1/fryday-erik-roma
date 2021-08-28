import {authApi, ParamsAuthType} from '../../api/Api';
import {AppThunkType} from '../../app/Store';
import {redirectLogin} from '../utils/Utils';
import {setStatusApp} from "../statusApp/StatusAppReducer";

export type RegistrationTypes = {
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

export const getRegistration = (params: ParamsAuthType): AppThunkType => dispatch => {
    dispatch(setStatusApp('load'));
    authApi.registration(params)
        .then(res => {
            if (res) {
                redirectLogin();
            }
        })
        .catch(err => {
            const errMessage = err.response ? `${err.message} \n ${err.response.data.error}` : 'some error has occurred';
            dispatch(setIsRegistered(false, errMessage));
        }).finally(() => {
        dispatch(setStatusApp('idle'));
    })
}

