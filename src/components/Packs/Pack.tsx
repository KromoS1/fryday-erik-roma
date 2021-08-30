import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {getPacks, PackType, removePack} from "./PacksReducer";
import {alertMessage} from "../utils/Utils";
import {StatusApp} from "../statusApp/StatusAppReducer";

export const Pack = () => {
    const packs = useSelector<AppRootStateType,PackType[]>(state => state.packs);
    const meID = useSelector<AppRootStateType,string>(state => state.profile._id);
    const statusApp = useSelector<AppRootStateType,StatusApp>(state => state.statusApp);
    const dispatch = useDispatch();

    alertMessage(statusApp.status,statusApp.message);

    useEffect(() => {
        dispatch(getPacks({user_id:meID}));
    },[dispatch])

    const remove = (id:string) => {
        dispatch(removePack(id));
    }

    return (
        <div>
            {packs.map(pack => {
               return (
                   <div key={pack._id}>
                       {pack.name}
                       <button onClick={() => remove(pack._id)}>remove</button>
                       <br/>
                   </div>
               )
            })}
        </div>
    )
}