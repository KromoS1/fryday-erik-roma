import React, {FC} from 'react';
import style from "./Packs.module.scss";
import {CommonSlider} from "../../commonComponents/Slider/CommonSlider";
import {PackContainer} from "./Pack";
import {HeaderPacks} from "../componentsForNavbar/HeaderPacks";
import {Route} from "react-router-dom";
import {CardsContainer} from "../Cards/Cards";
import {SearchInput} from "../../commonComponents/serachInput/SearchInput";

export type ComponentNameType = {
    name:'profile' | 'packs'
}

export const PacksPage: FC = () => {
    return (
        <>
            <div className={style.container}>
                <div className={style.slider}>
                    <div className={style.sliderHeader}>
                        <HeaderPacks/>
                    </div>
                    <CommonSlider/>
                </div>
                <div className={style.packs}>
                    <div className={style.mainTitle}>Packs list</div>
                    <div className={style.search}>
                        <SearchInput/>
                    </div>
                    <div className={style.packTable}>
                        <Route exact path={'/packs'} render={() => <PackContainer name={'packs'}/>}/>
                        <Route path={'/packs/cards/:pack_id'} render={() => <CardsContainer/>}/>
                    </div>
                </div>
            </div>
        </>
    )
};