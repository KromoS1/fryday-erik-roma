export const profileReducerInitialState: ProfileReducerInitialStateTypes = {
    id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
}

export const profileReducer = (state = profileReducerInitialState, action: ProfileReducerActionTypes) => {
    switch (action.type) {
        case "PROFILE/SET_USER_DATA":
            return {
                ...state,
                id: action.userData.id,
                email: action.userData.email,
                name: action.userData.name,
                publicCardPacksCount: action.userData.publicCardPacksCount
            }
        default:
            return state
    }
}


/* Action creators */
export const setUserData = (userData: ProfileReducerInitialStateTypes) =>
    ({type: "PROFILE/SET_USER_DATA", userData} as const)

/* Thunk creators */


/* Types */
export type ProfileReducerInitialStateTypes = {
    id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
}
export type ProfileReducerActionTypes =
    |ReturnType<typeof setUserData>
