import React, {FC, ChangeEvent, memo, useCallback} from 'react'
import {Input, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {Status} from "../../components/statusApp/StatusAppReducer";
import {getPacks} from "../../components/packs/PacksReducer";
import {PackDataRequestType} from "../../app/requestDataReducerPacks";
import {CardDataRequestType} from "../../api/CardsAPI";
import {getCards} from "../../components/cards/CardsReducer";
import {useParams} from "react-router-dom";

interface SearchInputType {
    nameSearch: string
}

export const SearchInput: FC<SearchInputType> = memo(props => {
    const statusApp = useSelector<AppRootStateType, Status>(state => state.statusApp.status);
    const dataParamsPack = useSelector<AppRootStateType, PackDataRequestType>(state => state.getPacksParams);
    const dataParamsCard = useSelector<AppRootStateType, CardDataRequestType>(state => state.getCardsParams);
    const dispatch = useDispatch();
    const {pack_id} = useParams<{ pack_id: string }>()
    const {Search} = Input;
    let load;

    statusApp !== "load" ? load = false : load = true

    const onSearch = useCallback((value: string) => {
        if (props.nameSearch === 'packs') {
            dispatch(getPacks({...dataParamsPack, packName: value}))
        }
        if (props.nameSearch === 'cards') {
            dispatch(getCards({...dataParamsCard, cardsPack_id:pack_id, cardQuestion:value}))
        }
    }, [ dataParamsCard,pack_id,props.nameSearch, dataParamsPack, dispatch]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '') {
            dispatch(getPacks({...dataParamsPack, packName: ''}))
        }
    }, [dataParamsPack, dispatch]);

    return (
        <>
            <Space direction="vertical" style={{width:"100%",marginTop:"5px"}}>
                <Search placeholder="Search" onSearch={onSearch} enterButton loading={load}
                        onChange={onChangeHandler}/>
            </Space>
        </>
    )
})