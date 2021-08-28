import {
    recoveryPasswordReducer,
    RecoveryPasswordType,
    setSendStatus
} from "./RecoveryPasswordReducer";

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