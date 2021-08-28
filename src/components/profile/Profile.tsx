import React, {FC} from 'react'
import {ProfileType} from '../../api/Api';

type PropsType = {
    profile:ProfileType
    logOut: () => void
}

export const Profile:FC<PropsType> = props => {

    let profile = '';
    if (props.profile) {
        profile = 'Hello user';
    }

    return (
        <>
            <div>{profile}</div>
            <div>
                <button onClick={props.logOut}>Logout</button>
            </div>
        </>
    )
}