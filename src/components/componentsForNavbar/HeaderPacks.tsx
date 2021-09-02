import React,{FC} from 'react'
import style from "../packs/Packs.module.scss";

export const HeaderPacks:FC = () => {
return (
        <>
            <div className={style.title}>Show packs cards</div>
            <div className={style.buttons}>
                <button className={style.btnMy}>My</button>
                <button className={style.btnAll}>All</button>
            </div>
        </>
    )
}