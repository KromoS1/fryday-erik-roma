import {loginReducer, LoginReducerInitialStateTypes, setIsAuth} from "./login-reducer";

let initialSate: LoginReducerInitialStateTypes

beforeEach(() => {
    initialSate = {
        isAuth: false
    }
})

test("new auth status should be set",() => {
    const action = setIsAuth(true)
    const endState = loginReducer(initialSate, action)

    expect(endState.isAuth).toBeTruthy()
})