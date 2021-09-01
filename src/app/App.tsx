import React from 'react';
import {Routes} from '../components/Routes';
import style from './AppStyle.module.scss';
import {SearchInput} from "../commonComponents/serachInput/SearchInput";

export const App = () => {

    return (
        <div className={style.page}>
            <Routes/>
            <SearchInput/>
        </div>
    )
};

