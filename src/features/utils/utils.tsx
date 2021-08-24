import {Redirect} from 'react-router-dom';

export const redirectLogin = () => {
    return <Redirect to={"/login"}/>
}