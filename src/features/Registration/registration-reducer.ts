import {authApi, ParamsAuthType} from '../../api/api';
import {AppThunkType} from '../../app/store';
import {redirectLogin} from '../utils/utils';

export type InitialStateTypes = {
    error: string | null
}

export type RegistrationActionTypes = ReturnType<typeof setIsRegistered>

const InitialState: InitialStateTypes = {
    error: null
}

export const registrationReducer = (state: InitialStateTypes = InitialState, action: RegistrationActionTypes): InitialStateTypes => {
       switch(action.type) {
           case "REGISTRATION/GET_REGISTERED_REQUEST": {
               return {...state, error: action.error}
           }
           default: return state;
       }
};

export const setIsRegistered = (isRegistered: boolean, error: string | null) =>
    ({type: 'REGISTRATION/GET_REGISTERED_REQUEST', error} as const);

export const getRegistration = (params: ParamsAuthType): AppThunkType => dispatch => {
    authApi.registration(params)
        .then( res => {
            if (res){
                redirectLogin();
            }
        })
        .catch(err => {
            const errMessage =  err.response ?  `${err.message} \n ${err.response.data.error}` : 'some error has occurred';
            dispatch(setIsRegistered(false, errMessage));
        })

}

