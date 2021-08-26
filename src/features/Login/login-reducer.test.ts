import {loginReducer, LoginType, setIsAuth} from "./login-reducer";

let initialSate: LoginType

beforeEach(() => {
    initialSate = {
        isAuth: false,
        isInitialize:false
    }
})

test("new auth status should be set",() => {
    const action = setIsAuth(true)
    const endState = loginReducer(initialSate, action)

    expect(endState.isAuth).toBeTruthy()
})