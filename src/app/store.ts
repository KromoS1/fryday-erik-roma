import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {loginReducer, LoginAT} from "../features/Login/login-reducer";
import {registrationReducer, RegistrationAT} from "../features/Registration/registration-reducer";
import {profileReducer, ProfileReducerActionTypes} from "../features/Profile/profile-reducer";
import {NewPasswordReducerActionTypes} from "../features/NewPassword/new-password-reducer";
import {
    recoveryPasswordReducer,
    RecoveryPasswordAT
} from "../features/RecoveryPassword/recovery-password-reducer";
import {AppReducerActionTypes} from "./app-reducer";


export const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    registrationInfo: registrationReducer,
    recovery: recoveryPasswordReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType =
    | AppReducerActionTypes
    | LoginAT
    | RegistrationAT
    | ProfileReducerActionTypes
    | RecoveryPasswordAT
    | NewPasswordReducerActionTypes

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

//@ts-ignore
window.store = window