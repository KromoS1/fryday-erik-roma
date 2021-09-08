export type StatusAppAT =
    | ReturnType<typeof setIsInit>
    | ReturnType<typeof setStatusApp>

export type Status = 'idle' | 'load' | 'success' | 'error'

export interface StatusApp {
    isInitialize: boolean
    status: Status
    message:string
}

const initialState: StatusApp = {
    isInitialize: false,
    status: 'idle',
    message:'',
}

export const setIsInit = (isInit: boolean) => ({type: 'STATUS-APP/SET_IS_INITIALIZE', isInit} as const);
export const setStatusApp = (status: Status,message:string) => ({type: 'STATUS-APP/SET-STATUS', payload:{status,message}} as const);

export const statusAppReducer = (state = initialState, action: StatusAppAT): StatusApp => {
    switch (action.type) {
        case 'STATUS-APP/SET_IS_INITIALIZE':
            return {...state, isInitialize: action.isInit}
        case 'STATUS-APP/SET-STATUS':
            return {...state, ...action.payload}
        default:
            return state
    }
}

