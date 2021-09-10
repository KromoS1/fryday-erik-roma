import React, {FC, memo, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/Store";
import {PacksStateType, removePack} from "../PacksReducer";
import {PacksTable} from "./PacksTable";
import {ComponentNameType} from "../PacksPage";
import {DataRequestType} from "../../../app/requestDataReducer";
import style from "../PacksPage.module.scss";
import {SearchInput} from "../../../commonComponents/serachInput/SearchInput";
import {changeModalStatus} from "../../utils/Utils";

interface PacksContainerType extends ComponentNameType {
    meID?: string
}

export const PacksTableContainer: FC<PacksContainerType> = memo(props => {
    const {packs, packsCount} = useSelector<AppRootStateType, PacksStateType>(state => state.packs);
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const dispatch = useDispatch();

    const remove = useCallback((id: string) => {
        dispatch(removePack(dataParams, id));
    }, [dispatch, dataParams]);

    return (
        <>
            <div className={style.mainTitle}>Packs list</div>
            <div className={style.search}>
                <SearchInput/>
                <div className={style.addButton}>
                    <button
                        className={style.btnAdd}
                        onClick={e => changeModalStatus(e, dispatch)}
                        data-button="add-pack">
                        Add new pack
                    </button>
                </div>
            </div>
            <PacksTable packs={packs}
                        packsCount={packsCount}
                        remove={remove}
                        meID={props.meID}
                        name={props.name}
                        dataParams={dataParams}/>
        </>
    )
})