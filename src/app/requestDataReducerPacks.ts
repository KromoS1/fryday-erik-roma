export type DataPacksAT =
    | ReturnType<typeof setRequestPackData>

export interface PackDataRequestType {
    user_id?: string
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
}
const initialState: PackDataRequestType = {
    user_id: '',
    packName: '',
    min: 0,
    max: 0,
    sortPacks: '',
    page: 1,
    pageCount: 5
}

export const setRequestPackData = (data: PackDataRequestType) => ({
    type: 'DATA-PACKS/SET-REQUEST-DATA',
    data
} as const);

export const DataRequestReducerPacks = (state = initialState, action: DataPacksAT): PackDataRequestType => {
    switch (action.type) {
        case "DATA-PACKS/SET-REQUEST-DATA":
            return {...state, ...action.data}
        default:
            return state
    }
}