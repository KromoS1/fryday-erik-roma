export type StatusAppAT =
    | ReturnType<typeof setIsInit>
    | ReturnType<typeof setStatusApp>

export type Status = 'idle' | 'load' | 'success'

export type StatusApp = {
    isInitialize: boolean
    status: Status
}

const initialState: StatusApp = {
    isInitialize: false,
    status: 'idle',
}

export const setIsInit = (isInit: boolean) => ({type: 'STATUS-APP/SET_IS_INITIALIZE', isInit} as const);
export const setStatusApp = (status: Status) => ({type: 'STATUS-APP/SET-STATUS', status} as const);

export const statusAppReducer = (state = initialState, action: StatusAppAT): StatusApp => {
    switch (action.type) {
        case 'STATUS-APP/SET_IS_INITIALIZE':
            return {...state, isInitialize: action.isInit}
        case 'STATUS-APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

