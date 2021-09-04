import React, {FC} from 'react';
import style from "./PacksPage.module.scss";
import {CommonSlider} from "../../commonComponents/Slider/CommonSlider";
import {PacksTableContainer} from "./packsTable/PacksTableContainer";
import {HeaderPacks} from "../componentsForNavbar/HeaderPacks";
import {Route} from "react-router-dom";
import {CardsContainer} from "../Cards/Cards";
import {SearchInput} from "../../commonComponents/serachInput/SearchInput";

export type ComponentNameType = {
    name: 'profile' | 'packs'
}

type PacksPagePropsType = {
    addNewPack: (newPackName: string) => void
}

export const PacksPage: FC<PacksPagePropsType> = props => {
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
                        <div className={style.addButton}>
                            <button
                                className={style.btnAdd}
                                onClick={() => props.addNewPack("my new pack")}
                            >Add new pack</button>
                        </div>
                    </div>
                    <div className={style.packTable}>
                        <Route exact path={'/packs'} render={() => <PacksTableContainer name={'packs'}/>}/>
                        <Route path={'/packs/cards/:pack_id'} render={() => <CardsContainer/>}/>
                    </div>
                </div>
            </div>
        </>
    )
};