import {Redirect} from 'react-router-dom';

export const redirectLogin = () => {
    return <Redirect to={"/login"}/>
}

export const RecoveryMessage = () => {
    return (
        `<div>
            <span>Follow the link to set a new password:</span>
            <a href="https://kromos1.github.io/fryday-erik-roma-pasha/#/set-new-password/$token$">click on the link to confirm your mail</a>
        </div>`
    )
}
