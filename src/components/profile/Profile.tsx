import React, {FC, memo} from 'react';
import {ProfileType} from "./ProfileContainer";
import style from './Profile.module.scss';
import {PackContainer} from "../packs/Pack";
import {CommonSlider} from "../../commonComponents/Slider/CommonSlider";
import {Route} from "react-router-dom";
import {HeaderProfile} from "../componentsForNavbar/HeaderProfile";
import {CardsContainer} from "../Cards/Cards";
import {ComponentNameType} from "../packs/PacksPage";

type PropsType = ComponentNameType & {
    profile: ProfileType
    meID: string
    logOut: () => void
}

export const Profile: FC<PropsType> = memo(props => {

        return (
            <>
                <div className={style.container}>
                    <div className={style.slider}>
                        <div className={style.sliderHeader}>
                            <HeaderProfile/>
                        </div>
                        <CommonSlider/>
                    </div>
                    <div className={style.packs}>
                        <div className={style.mainTitle}>My packs list</div>
                        <div className={style.search}>

                        </div>
                        <div className={style.packTable}>
                            <Route exact path={'/profile'} render={() => <PackContainer meID={props.meID} name={props.name}/>}/>
                            <Route path={'/profile/cards/:pack_id'} render={() => <CardsContainer/>}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
)