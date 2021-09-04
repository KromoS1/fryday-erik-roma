import React, {memo} from "react";
import style from './Preloader.module.css'

export const Preloader = memo(() => {
    return(
        <div className={style.preloader}>
            <div className={style.preloader__image_animate}>
            </div>
        </div>
    )
})
