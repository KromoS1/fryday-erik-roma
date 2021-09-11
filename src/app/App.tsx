import React, {memo, useEffect} from 'react';
import style from './AppStyle.module.scss';

import {Registration} from "../components/registration/Registration";

export const App = memo(() => {

    return (
        <div className={style.page}>
           <Registration/>
        </div>
    )
})