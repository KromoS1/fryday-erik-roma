import {NewPasswordTypes} from "./NewPasswordReducer";

let initialSate: NewPasswordTypes

beforeEach(() => {
    initialSate = {
        setPasswordStatus: false
    }
})