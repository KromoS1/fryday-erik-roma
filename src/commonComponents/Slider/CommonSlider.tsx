import React, {FC, memo} from 'react';
import style from "./CommonSlider.module.scss";
import {Slider} from "antd";
import * as CSS from "csstype";
import {useDispatch} from "react-redux";
import {getPacks} from "../../components/packs/PacksReducer";

export const CommonSlider: FC = memo(() => {

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

    const setValue = (value:[number,number]) => {
        dispatch(getPacks({min:value[0], max: value[1]}));
    }

    return (
        <div className={style.numberCards}>
            <span className={style.numberTitle}>Number of cards</span>
            <div className={style.doubleRange}>
                <Slider
                    min={1}
                    max={20}
                    range={{draggableTrack: true}}
                    defaultValue={[1, 5]}
                    tooltipVisible={true}
                    trackStyle={trackStyle}
                    handleStyle={handleStyle}
                    onAfterChange={setValue}
                />
            </div>
        </div>
    )
})