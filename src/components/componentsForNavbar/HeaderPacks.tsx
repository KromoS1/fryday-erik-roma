import React,{FC} from 'react'
import style from "../packs/PacksPage.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {getPacks} from "../packs/PacksReducer";
import {DataRequestType} from "../../app/requestDataReducer";

export const HeaderPacks:FC = () => {
    const dispatch = useDispatch();
    const meId = useSelector<AppRootStateType,string>( state => state.profile._id);
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const clickMy = () => {
        dispatch(getPacks({...dataParams, user_id:meId}))
    }

    const clickAll = () => {
        dispatch(getPacks({...dataParams, user_id: undefined}))
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