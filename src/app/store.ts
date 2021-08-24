import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {loginReducer, LoginReducerActionTypes} from "../features/Login/login-reducer";
import {RegistrationReducerActionTypes} from "../features/Registration/registration-reducer";
import {profileReducer, ProfileReducerActionTypes} from "../features/Profile/profile-reducer";
import {NewPasswordReducerActionTypes} from "../features/NewPassword/new-password-reducer";
import {RecoveryPasswordReducerActionTypes} from "../features/RecoveryPassword/recovery-password-reducer";
import {AppReducerActionTypes} from "./app-reducer";


export const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType =
    | AppReducerActionTypes
    | LoginReducerActionTypes
    | RegistrationReducerActionTypes
    | ProfileReducerActionTypes
    | RecoveryPasswordReducerActionTypes
    | NewPasswordReducerActionTypes

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

//@ts-ignore
window.store = window