import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {addPack, CardsPackType, getPacks, putPacks, removePack} from "./PacksReducer";

export const Pack = () => {
    const packs = useSelector<AppRootStateType,CardsPackType[]>(state => state.packs);
    const meID = useSelector<AppRootStateType,string>(state => state.profile._id);
    const dispatch = useDispatch();

    console.log('render pack')

    useEffect(() => {
        dispatch(getPacks({user_id:meID}));
        // dispatch(putPacks({_id:'612b495a8f639c0004ce1389', name:'Roma'}))
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