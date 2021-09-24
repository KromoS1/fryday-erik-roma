import React, {FC, memo} from 'react';
import style from "./PacksPage.module.scss";
import {CommonSlider} from "../../commonComponents/slider/CommonSlider";
import {PacksTableContainer} from "./packsTable/PacksTableContainer";
import {HeaderPacks} from "../componentsForNavbar/HeaderPacks";
import {Route} from "react-router-dom";
import {CardsContainer} from "../cards/Cards";
import {ModalContainer} from "../../commonComponents/Modal/ModalContainer";
import {SearchInput} from "../../commonComponents/serachInput/SearchInput";
import {changeModalStatus} from "../utils/Utils";
import {useDispatch} from "react-redux";

export interface ComponentNameType {
    name: 'profile' | 'packs'
}

interface PacksPagePropsType {
    addNewPack: (newPackName: string) => void
}

export const PacksPage: FC<PacksPagePropsType> = memo(() => {
    const dispatch = useDispatch();

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
                    <div className={style.title}>Packs list</div>
                    <div className={style.headerTable}>
                        <SearchInput/>
                        <div className={style.addButton}>
                            <button
                                className={style.btn}
                                onClick={e => changeModalStatus(e, dispatch)}
                                data-button="add-pack">
                                Add new pack
                            </button>
                        </div>
                    </div>
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