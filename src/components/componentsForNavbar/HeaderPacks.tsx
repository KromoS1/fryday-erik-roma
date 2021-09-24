import React, {FC, memo, useCallback, useState} from 'react';
import style from "../packs/PacksPage.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {getPacks} from "../packs/PacksReducer";
import {DataRequestType} from "../../app/requestDataReducer";

export const HeaderPacks: FC = memo(() => {
    const dispatch = useDispatch();
    const meId = useSelector<AppRootStateType, string>(state => state.profile._id);
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const [my,setMy] = useState<boolean>(false);
    const [all,setAll] = useState<boolean>(true);

    const clickMy = useCallback(() => {
        clickBtnForState('my');
        dispatch(getPacks({...dataParams, user_id: meId}))
    },[dataParams,meId,dispatch]);

    const clickAll = useCallback(() => {
        clickBtnForState('all');
        dispatch(getPacks({...dataParams, user_id: undefined}))
    },[dataParams,dispatch]);

    const clickBtnForState = (nameBtn:string) => {
       if (nameBtn === 'my') {
           setMy(true);
           setAll(false);
       }
        if (nameBtn === 'all'){
            setMy(false);
            setAll(true);
        }
    }

    const styleClick = (nameBtn:string) => {
        switch (nameBtn){
            case 'my':
                return my ? style.btnActive : style.btnInactive;
            case 'all':
                return all ? style.btnActive : style.btnInactive;
        }
    }

    return (
        <>
            <div className={style.title}>Show packs cards</div>
            <div className={style.buttons}>
                <button className={styleClick('my')} onClick={() => clickMy()}>My</button>
                <button className={styleClick('all')} onClick={() => clickAll()}>All</button>
            </div>
        </>
    )
})