import React, {FC, memo} from 'react';
import style from "./CommonSlider.module.scss";
import {Slider} from "antd";
import * as CSS from "csstype";

export const CommonSlider: FC = memo(() => {

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

    return(
        <div className={style.numberCards}>
            <span className={style.numberTitle}>Number of cards</span>
            <div className={style.doubleRange}>
                <Slider
                    range={{draggableTrack: true}}
                    defaultValue={[20, 50]}
                    tooltipVisible={true}
                    trackStyle={trackStyle}
                    handleStyle={handleStyle}
                />
            </div>
        </div>
    )
})