import {
    recoveryPasswordReducer,
    RecoveryPasswordType,
    setSendStatus
} from "./recovery-password-reducer";

let initialSate: RecoveryPasswordType

beforeEach(() => {
    initialSate = {
        isSend: false
    }
})

test("send status should be set", () => {
    const action = setSendStatus(true)
    const endState = recoveryPasswordReducer(initialSate, action)

    expect(endState.isSend).toBeTruthy();
})