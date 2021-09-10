import React, {FC, memo, useCallback} from 'react';
import style from "./CommonSlider.module.scss";
import {Slider} from "antd";
import * as CSS from "csstype";
import {useDispatch, useSelector} from "react-redux";
import {getPacks} from "../../components/packs/PacksReducer";
import {AppRootStateType} from "../../app/Store";
import {DataRequestType} from "../../app/requestDataReducer";

export const CommonSlider: FC = memo(() => {
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const dispatch = useDispatch();

    const trackStyle: CSS.Properties[] = [
        {
            background: '#21268F',
            borderRadius: '10px'
        }
    ];
    const handleStyle: CSS.Properties[] = [
        {
            background: '#FFFFFF',
            border: '4px solid #21268F',
            boxSizing: 'border-box'
        },
        {
            background: '#FFFFFF',
            border: '4px solid #21268F',
            boxSizing: 'border-box'
        }
    ];

    const setValue = useCallback((value:[number,number]) => {
        dispatch(getPacks({...dataParams, min:value[0], max: value[1]}));
    },[dataParams,dispatch]);

    return (
        <div className={style.numberCards}>
            <span className={style.numberTitle}>Number of cards</span>
            <div className={style.doubleRange}>
                <Slider
                    min={0}
                    max={20}
                    range={{draggableTrack: true}}
                    defaultValue={[0, 5]}
                    tooltipVisible={true}
                    trackStyle={trackStyle}
                    handleStyle={handleStyle}
                    onAfterChange={setValue}
                />
            </div>
        </div>
    )
})