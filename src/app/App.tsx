import React from 'react';
import {Routes} from '../components/Routes';
import style from './AppStyle.module.scss';

export const App = () => {

    return (
        <div className={style.page}>
            <Routes/>
        </div>
    )
};

