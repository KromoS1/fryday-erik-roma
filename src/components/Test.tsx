import React from 'react'
import SuperInput from "./SuperInput/SuperInput";
import SuperCheckbox from "./SuperCheckbox/SuperCheckbox";
import SuperButton from "./SuperButton/SuperButton";
import {Preloader} from "./Preloader/Preloader";


export const Test: React.FC = React.memo(() => {
    return (
        <>
            <SuperInput/>
            <SuperCheckbox/>
            <SuperButton/>
            <Preloader/>
        </>
    )
})