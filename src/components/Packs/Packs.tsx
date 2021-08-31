import React, {FC} from 'react';
import style from "./Packs.module.scss";
import {PackContainer} from "./Pack";
import {CommonSlider} from "../../commonComponents/Slider/CommonSlider";


export const Packs: FC = () => {

    return (
        <>
            <div className={style.container}>
                <div className={style.slider}>
                    <div className={style.sliderHeader}>
                        <div className={style.title}>Show packs cards</div>
                        <div className={style.buttons}>
                            <button className={style.btnMy}>My</button>
                            <button className={style.btnAll}>All</button>
                        </div>
                    </div>
                    <CommonSlider/>
                </div>
                <div className={style.packs}>
                    <div className={style.mainTitle}>Packs list</div>
                    <div className={style.search}>

                    </div>
                    <div className={style.packTable}>
                        <PackContainer/>
                    </div>
                </div>
            </div>
        </>
    )
};