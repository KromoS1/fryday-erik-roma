import {authApi, RegistrationRequestParamsType} from "../../api/api";
import {AppThunkType} from "../../app/store";

export const registrationReducerInitialState: RegistrationReducerInitialStateTypes = {
    isRegistered: false,
    error: null
}

export const registrationReducer =
    (state: RegistrationReducerInitialStateTypes = registrationReducerInitialState, action: RegistrationReducerActionTypes): RegistrationReducerInitialStateTypes => {
       switch(action.type) {
           case "REGISTRATION/GET_REGISTERED_REQUEST": {
               return {...state, error: action.error, isRegistered: action.isRegistered}
           }
           default: return state;
       }
};


/* Action creators */
export const setIsRegistered = (isRegistered: boolean, error: string | null) => ({type: 'REGISTRATION/GET_REGISTERED_REQUEST', isRegistered, error} as const);

/* Thunk creators */
export const getRegistration = (params: RegistrationRequestParamsType): AppThunkType => dispatch => {
    authApi.registration(params)
        .then( res => {
            console.log(res);
            dispatch(setIsRegistered(true, null))
        })
        .catch(err => {

            const errMessage =  err.response ?  `${err.message} \n ${err.response.data.error}` : 'some error has occurred';
            console.log(errMessage)
            dispatch(setIsRegistered(false, errMessage))
        })

}

/* Types */
export type RegistrationReducerInitialStateTypes = {
    isRegistered: boolean,
    error: string | null
}           //need to fix
export type RegistrationReducerActionTypes = ReturnType<typeof setIsRegistered>//need to fix
