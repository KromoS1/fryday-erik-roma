import React from 'react';
import {Routes} from '../components/Routes';
import style from './AppStyle.module.scss';
import {SearchInput} from "../commonComponents/serachInput/SearchInput";
import {Header} from "../components/Header/Header";

export const App = () => {

    return (
        <>
            <Header/>
            <div className={style.page}>
                <Routes/>
                <SearchInput/>
            </div>
        </>
    )
};

