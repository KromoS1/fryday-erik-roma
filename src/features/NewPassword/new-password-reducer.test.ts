import {NewPasswordTypes} from "./new-password-reducer";

let initialSate: NewPasswordTypes

beforeEach(() => {
    initialSate = {
        setPasswordStatus: false
    }
})