import React, {FC, ChangeEvent} from 'react'
import {Input, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {Status} from "../../components/statusApp/StatusAppReducer";
import {getPacks} from "../../components/packs/PacksReducer";
import {DataRequestType} from "../../app/requestDataReducer";

export const SearchInput:FC = () => {
    const statusApp = useSelector<AppRootStateType,Status>(state => state.statusApp.status);
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const dispatch = useDispatch();
    const { Search } = Input;
    let load;

    statusApp !== "load" ? load = false : load = true

    const onSearch = (value:string) => {
        dispatch(getPacks({...dataParams,packName:value}))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '') {
            dispatch(getPacks({...dataParams,packName:''}))
        }
    }

return (
        <>
            <Space direction="vertical">
                <Search placeholder="input search text" onSearch={onSearch} enterButton loading={load} onChange={onChangeHandler}/>
            </Space>
        </>
    )
}