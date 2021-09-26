import React, {FC, memo} from "react";
import style from './HeaderForPages.module.scss';
import {SearchInput} from "../serachInput/SearchInput";
import {changeModalStatus} from "../../components/utils/Utils";
import {useDispatch} from "react-redux";

export const SearchAndButton:FC<{name:string}> = memo(props => {
    const dispatch = useDispatch();

    switch (props.name) {
        case 'pack':
            return (
                <div className={style.head}>
                    <div className={style.title}>Packs</div>
                    <div className={style.headerTable}>
                        <SearchInput nameSearch={'packs'}/>
                        <div className={style.addButton}>
                            <button
                                className={style.btn}
                                onClick={e => changeModalStatus(e, dispatch)}
                                data-button="add-pack">
                                Add new pack
                            </button>
                        </div>
                    </div>
                </div>
            )
        case 'card':
            return (
                <div className={style.head}>
                    <div className={style.title}>Cards</div>
                    <div className={style.headerTable}>
                        <SearchInput nameSearch={'cards'}/>
                        <div className={style.addButton}>
                            <button
                                className={style.btn}
                                onClick={e => changeModalStatus(e, dispatch)}
                                data-button="add-card">
                                Add new card
                            </button>
                        </div>
                    </div>
                </div>
            )
        default:
            return <></>
    }
})


