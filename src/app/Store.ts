import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {loginReducer, LoginAT} from "../components/login/LoginReducer";
import {registrationReducer, RegistrationAT} from "../components/registration/RegistrationReducer";
import {profileReducer, ProfileReducerAT} from "../components/profile/ProfileReducer";
import {recoveryPasswordReducer, RecoveryPasswordAT} from "../components/recoveryPassword/RecoveryPasswordReducer";
import {newPasswordReducer, NewPasswordAT} from "../components/newPassword/NewPasswordReducer";
import {StatusAppAT, statusAppReducer} from "../components/statusApp/StatusAppReducer";
import {CardAT, CardsReducer} from "../components/Cards/CardsReducer";
import {PackAT, PacksReducer} from "../components/packs/PacksReducer";


export const rootReducer = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    registrationInfo: registrationReducer,
    recovery: recoveryPasswordReducer,
    creatingPasswordInfo: newPasswordReducer,
    statusApp: statusAppReducer,
    packs: PacksReducer,
    cards: CardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType =
    | LoginAT
    | RegistrationAT
    | ProfileReducerAT
    | RecoveryPasswordAT
    | NewPasswordAT
    | StatusAppAT
    | PackAT
    | CardAT

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
