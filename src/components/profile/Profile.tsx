import React, {FC, memo} from 'react';
import {ProfileType} from "./ProfileContainer";
import style from './Profile.module.scss';
import {PacksTableContainer} from "../packs/packsTable/PacksTableContainer";
import {CommonSlider} from "../../commonComponents/slider/CommonSlider";
import {Route} from "react-router-dom";
import {HeaderProfile} from "../componentsForNavbar/HeaderProfile";
import {CardsContainer} from "../cards/Cards";
import {ComponentNameType} from "../packs/PacksPage";
import {SearchInput} from "../../commonComponents/serachInput/SearchInput";
import {changeModalStatus} from "../utils/Utils";
import {useDispatch} from "react-redux";

interface PropsType extends ComponentNameType {
    profile: ProfileType
    meID: string
    logOut: () => void
}

export const Profile: FC<PropsType> = memo(props => {
    const dispatch = useDispatch();

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
                    <div className={style.title}>My packs list</div>
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
                        <Route exact path={'/profile'}
                               render={() => <PacksTableContainer meID={props.meID} name={props.name}/>}/>
                        <Route path={'/profile/cards/:pack_id'} render={() => <CardsContainer/>}/>
                    </div>
                </div>
            </div>
        </>
    );
})