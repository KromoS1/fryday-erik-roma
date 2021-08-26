import {Redirect} from 'react-router-dom';

export const redirectLogin = () => {
    return <Redirect to={"/login"}/>
}

export const RecoveryMessage = () => {
    return (
        `<div>
            <span>Follow the link to set a new password:</span>
            <a href="http://localhost:3000/#/set-new-password/$token$">link</a>
        </div>`
    )
}