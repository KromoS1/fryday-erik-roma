export type DataAT =
    | ReturnType<typeof setRequestData>

export  type DataRequestType = {
    user_id?: string
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
}
const initialState: DataRequestType = {
    user_id: undefined,
    packName: undefined,
    min: undefined,
    max: undefined,
    sortPacks: undefined,
    page: 1,
    pageCount: 5
}

export const setRequestData = (data: DataRequestType) => ({
    type: 'DATA/SET-REQUEST-DATA',
    data
} as const);

export const DataRequestReducer = (state = initialState, action: DataAT): DataRequestType => {
    switch (action.type) {
        case "DATA/SET-REQUEST-DATA":
            return {...state, ...action.data}
        default:
            return state
    }
}