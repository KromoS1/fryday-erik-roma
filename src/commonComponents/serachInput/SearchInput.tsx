import React, {FC} from 'react'
import {Input, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {Status} from "../../components/statusApp/StatusAppReducer";
import {getPacks} from "../../components/packs/PacksReducer";

export const SearchInput:FC = () => {
    const statusApp = useSelector<AppRootStateType,Status>(state => state.statusApp.status);
    const dispatch = useDispatch();
    const { Search } = Input;
    let load;

    statusApp !== "load" ? load = false : load = true

    const onSearch = (value:string) => {
        dispatch(getPacks({packName:value}))
    }

return (
        <>
            <Space direction="vertical">
                <Search placeholder="input search text" onSearch={onSearch} enterButton loading={load}/>
            </Space>
        </>
    )
}