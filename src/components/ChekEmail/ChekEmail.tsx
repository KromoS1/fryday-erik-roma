import React, {FC} from 'react';
import {useLocation} from "react-router-dom";
import style from './ChekEmail.module.scss'
import checkEmailImg from './../../resources/images/checkEmail.jpg';

export const ChekEmail: FC = () => {
    const location = useLocation<{userEmail: string}>();
    return <div className={style.chekMail}>
        <div className={style.title}>Cards</div>
        <img src={checkEmailImg} className={style.authIcon} alt={'Check your Email page'}/>
        <div className={style.titleName}>
            <h3>Check Email</h3>
        </div>
        <div className={style.subtitle}>
            We've sent an Email with instructions to {location.state ? location.state.userEmail : ' your Email'}
        </div>
    </div>
}