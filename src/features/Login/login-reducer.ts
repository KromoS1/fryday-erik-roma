import {AppThunkType} from "../../app/store";
import {authApi, LoginRequestParamsType} from "../../api/api";
import {setUserData} from "../Profile/profile-reducer";

export const loginReducerInitialState: LoginReducerInitialStateTypes = {}

export const loginReducer = (state = loginReducerInitialState, action: LoginReducerActionTypes) => {

}


/* Action creators */


/* Thunk creators */
export const loginTC = (loginParams: LoginRequestParamsType):AppThunkType => dispatch => {
    authApi.login(loginParams)
        .then(res => {
            const userDataParams = {
                id: res.data.id,
                email: res.data.email,
                name: res.data.name,
                publicCardPacksCount: res.data.publicCardPacksCount,
            }
            dispatch(setUserData(userDataParams))
            console.log(res)
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            console.log(error)
        })
}

/* Types */
export type LoginReducerInitialStateTypes = any           //need to fix
export type LoginReducerActionTypes = any                 //need to fix