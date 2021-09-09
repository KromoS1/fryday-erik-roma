import React, {FC, memo} from 'react';
import style from "./PacksPage.module.scss";
import {CommonSlider} from "../../commonComponents/Slider/CommonSlider";
import {PacksTableContainer} from "./packsTable/PacksTableContainer";
import {HeaderPacks} from "../componentsForNavbar/HeaderPacks";
import {Route} from "react-router-dom";
import {CardsContainer} from "../Cards/Cards";
import {SearchInput} from "../../commonComponents/serachInput/SearchInput";
import {useDispatch} from "react-redux";
import {changeModalStatus} from "../utils/Utils";
import {ModalContainer} from "../../commonComponents/Modal/ModalContainer";

export interface ComponentNameType {
    name: 'profile' | 'packs'
}

interface PacksPagePropsType {
    addNewPack: (newPackName: string) => void
}


export const PacksPage: FC<PacksPagePropsType> = memo(() => {

    const dispatch = useDispatch()

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
                                onClick={e => changeModalStatus(e, dispatch)}
                                data-button="add"
                            >Add new pack</button>
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