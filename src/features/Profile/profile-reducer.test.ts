import {profileReducer, ProfileReducerInitialStateTypes, setUserData} from "./profile-reducer";


let initialSate: ProfileReducerInitialStateTypes

beforeEach(() => {
    initialSate = {
        id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
    }
})

test("user data should be set", () => {
    const userData = {
        id: "123",
        email: "blabla@mail.com",
        name: "Yo",
        avatar: "",
        publicCardPacksCount: 10,
    }

    const action = setUserData(userData)
    const endState = profileReducer(initialSate, action)

    expect(endState.id).toBe("123")
    expect(endState.email).toBe("blabla@mail.com")
    expect(endState.name).toBe("Yo")
    expect(endState.publicCardPacksCount).toBe(10)
})