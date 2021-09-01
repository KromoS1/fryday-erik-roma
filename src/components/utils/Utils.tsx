import {Redirect} from 'react-router-dom';
import {Status} from "../statusApp/StatusAppReducer";
import {message} from "antd";

export const redirectLogin = () => {
    return <Redirect to={"/login"}/>
}

export const alertMessage = (status: Status, content: string) => {
    const key = "updatable";
    if (status === 'load') {
        message.loading({content: 'Loading...', key}).then(r => r);
    }
    if (status === "success") {
        message.success({content: content, key, duration: 2}).then(r => r);
    }
    if (status === 'error') {
        message.error({content, key, duration: 2}).then(r => r);
    }
};

export const RecoveryMessage = () => {
    return (
        `<div>
            <span>Follow the link to set a new password:</span>
            <a href="https://kromos1.github.io/fryday-erik-roma-pasha/#/set-new-password/$token$">click on the link to confirm your mail</a>
        </div>`
    )
}
export const DateMaker = (date: string) => {
    return `${new Date(date).getDate()}.${new Date(date).getMonth()}.${new Date(date).getFullYear()}`
}
