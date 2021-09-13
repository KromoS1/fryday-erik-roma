import React, {FC, memo} from 'react';
import style from "./PacksPage.module.scss";
import {CommonSlider} from "../../commonComponents/slider/CommonSlider";
import {PacksTableContainer} from "./packsTable/PacksTableContainer";
import {HeaderPacks} from "../componentsForNavbar/HeaderPacks";
import {Route} from "react-router-dom";
import {CardsContainer} from "../cards/Cards";
import {ModalContainer} from "../../commonComponents/Modal/ModalContainer";

export interface ComponentNameType {
    name: 'profile' | 'packs'
}

interface PacksPagePropsType {
    addNewPack: (newPackName: string) => void
}

export const PacksPage: FC<PacksPagePropsType> = memo(() => {

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
                    <div className={style.packTable}>
                        <Route exact path={'/packs'} render={() => <PacksTableContainer name={'packs'}/>}/>
                        <Route path={'/packs/cards/:pack_id'} render={() => <CardsContainer/>}/>
                    </div>
                </div>
            </div>
            <ModalContainer/>
        </>
    )
})