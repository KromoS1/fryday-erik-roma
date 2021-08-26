import {profileReducer, setUserData} from "./profile-reducer";
import {ResponseMeType} from "../../api/api";

let initialSate: ResponseMeType

beforeEach(() => {
    initialSate = {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
        created:"",
        updated:"",
        verified:false,
        rememberMe:false,
        isAdmin:false,
    }
})

test("user data should be set", () => {
    const userData = {
        _id: "123",
        email: "blabla@mail.com",
        name: "Yo",
        avatar: "",
        publicCardPacksCount: 10,
        created:"",
        updated:"",
        verified:false,
        rememberMe:false,
        isAdmin:false,
    }

    const action = setUserData(userData)
    const endState = profileReducer(initialSate, action)

    expect(endState._id).toBe("123")
    expect(endState.email).toBe("blabla@mail.com")
    expect(endState.name).toBe("Yo")
    expect(endState.publicCardPacksCount).toBe(10)
})