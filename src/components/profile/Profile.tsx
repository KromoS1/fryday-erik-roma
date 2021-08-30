import React, {FC} from 'react';
import {ProfileType} from "./ProfileContainer";
import style from './Profile.module.scss';
import {Pagination, Slider} from "antd";
import * as CSS from 'csstype';

type PropsType = {
    profile: ProfileType
    logOut: () => void
}

export const Profile: FC<PropsType> = props => {
   const profile = props.profile

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
        }
    ];

    return (
        <>
            <div className={style.container}>
                <div className={style.info}>
                    <div className={style.profileInfo}>
                        <div className={style.avatar}>
                            <img src={profile.avatar} alt="#"/>
                        </div>
                        <div className={style.name}>{profile.name}</div>
                        <div className={style.status}>Front-end developer</div>
                        <div className={style.button}>
                            <button className={style.btnEdit}>Edit profile</button>
                        </div>
                    </div>
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
                </div>
                <div className={style.packs}>
                    <div className={style.mainTitle}>My packs list</div>
                    <div className={style.search}>

                    </div>
                    <div className={style.packTable}>
                        Packs List
                    </div>
                    <div className={style.pagination}>
                        <Pagination defaultCurrent={6} total={500}/>
                    </div>
                </div>
            </div>
            {/*<div>
                <button onClick={props.logOut}>Logout</button>
            </div>*/}
        </>
    );
}