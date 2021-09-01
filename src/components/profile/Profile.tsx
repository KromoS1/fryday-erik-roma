import React, {FC, memo} from 'react';
import {ProfileType} from "./ProfileContainer";
import style from './Profile.module.scss';
import {PackContainer} from "../Packs/Pack";
import {CommonSlider} from "../../commonComponents/Slider/CommonSlider";


type PropsType = {
    profile: ProfileType
    logOut: () => void
}

export const Profile: FC<PropsType> = memo(props => {

        return (
            <>
                <div className={style.container}>
                    <div className={style.slider}>
                        <div className={style.sliderHeader}>
                            <img
                                src="data:image/png;base64,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"
                                alt="#"
                                className={style.avatar}
                            />
                            <div className={style.name}>Pavel Nikalaichyk</div>
                            <div className={style.status}>Front-end developer</div>
                            <div className={style.button}>
                                <button className={style.btnEdit}>Edit profile</button>
                            </div>
                        </div>
                        <CommonSlider/>
                    </div>
                    <div className={style.packs}>
                        <div className={style.mainTitle}>My packs list</div>
                        <div className={style.search}>

                        </div>
                        <div className={style.packTable}>
                            <PackContainer/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
)