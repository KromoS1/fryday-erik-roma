import React,{FC} from 'react'
import style from "../packs/Packs.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {getPacks} from "../packs/PacksReducer";

export const HeaderPacks:FC = () => {
    const dispatch = useDispatch();
    const meId = useSelector<AppRootStateType,string>( state => state.profile._id);

    const clickMy = () => {
        dispatch(getPacks({user_id:meId}))
    }

    const clickAll = () => {
        dispatch(getPacks({}))
    }

return (
        <>
            <div className={style.title}>Show packs cards</div>
            <div className={style.buttons}>
                <button className={style.btnMy} onClick={() => clickMy()}>My</button>
                <button className={style.btnAll} onClick={() => clickAll()}>All</button>
            </div>
        </>
    )
}