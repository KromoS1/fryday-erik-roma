import {InitialStateTypes} from './registration-reducer';


let initialSate: InitialStateTypes

beforeEach(() => {
    initialSate = {
        error: '',
        isRegistered: false
    }
})