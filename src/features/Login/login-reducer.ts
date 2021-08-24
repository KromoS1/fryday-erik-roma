import {AppThunkType} from "../../app/store";
import {authApi, LoginRequestParamsType} from "../../api/api";
import {setUserData} from "../Profile/profile-reducer";

export const loginReducerInitialState: LoginReducerInitialStateTypes = {
    isAuth: false
}

export const loginReducer =
    (state = loginReducerInitialState, action: LoginReducerActionTypes) => {
        switch (action.type) {
            case "LOGIN/SET_IS_AUTH":
                return {...state, isAuth: action.isAuth}
            default: return state
        }
    }


/* Action creators */
export const setIsAuth = (isAuth: boolean) => ({type: "LOGIN/SET_IS_AUTH", isAuth} as const)

/* Thunk creators */
export const loginTC = (loginParams: LoginRequestParamsType): AppThunkType => dispatch => {
    authApi.login(loginParams)
        .then(res => {
            const userDataParams = {
                id: res.data._id,
                email: res.data.email,
                name: res.data.name,
                publicCardPacksCount: res.data.publicCardPacksCount,
            }
            dispatch(setUserData(userDataParams))
            dispatch(setIsAuth(true))
            console.log(userDataParams)
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            console.log(error)
        })
};
export const logoutTC = (): AppThunkType => dispatch => {
    authApi.logout()
        .then(res => {
            console.log(res.data.info)
        })
}

/* Types */
export type LoginReducerInitialStateTypes = {
    isAuth: boolean
}
export type LoginReducerActionTypes =
    |ReturnType<typeof setIsAuth>