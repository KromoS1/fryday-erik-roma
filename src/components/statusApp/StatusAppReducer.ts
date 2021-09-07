export type StatusAppAT =
    | ReturnType<typeof setIsInit>
    | ReturnType<typeof setStatusApp>
    | ReturnType<typeof setModalStatus>

export type Status = 'idle' | 'load' | 'success' | 'error'
export type ModalStatus = 'no-status' | 'add' | 'delete' | 'update'
export type ModalType = {
    modalStatus: ModalStatus
    isShow: boolean
    itemID: string | undefined
    itemName: string | undefined
}

export type StatusApp = {
    isInitialize: boolean
    status: Status
    message: string
    modal: ModalType
}

const initialState: StatusApp = {
    isInitialize: false,
    status: 'idle',
    message: '',
    modal: {
        modalStatus: 'no-status',
        isShow: false,
        itemID: '',
        itemName: ''
    }
}

export const setIsInit = (isInit: boolean) => ({type: 'STATUS-APP/SET_IS_INITIALIZE', isInit} as const);
export const setStatusApp = (status: Status, message: string) => ({
    type: 'STATUS-APP/SET-STATUS',
    payload: {status, message}
} as const);
export const setModalStatus = (modalStatus: ModalStatus, isShow: boolean, itemID?: string, itemName?: string) => ({
    type: 'STATUS-APP/SET-MODAL-STATUS', payload: {modalStatus, isShow, itemID, itemName}
} as const);

export const statusAppReducer = (state = initialState, action: StatusAppAT): StatusApp => {
    switch (action.type) {
        case 'STATUS-APP/SET_IS_INITIALIZE':
            return {...state, isInitialize: action.isInit}
        case 'STATUS-APP/SET-STATUS':
            return {...state, ...action.payload}
        case "STATUS-APP/SET-MODAL-STATUS":
            return {...state, modal: {...action.payload}}
        default:
            return state
    }
}

