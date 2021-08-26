import {loginReducer, LoginType, setIsAuth} from "./login-reducer";

let initialSate: InitialStateTypes

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