import React, {FC, memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {getPacks, PacksStateType, PackType, removePack} from "./PacksReducer";
import {CardsType} from "../../api/CardsAPI";
import {TableForPacks} from "../../commonComponents/EditableTable/TableForCards";

type PropsType = {
    pack: PackType
    cards: CardsType[]
    remove: (id: string) => void
}

export const Pack: FC<PropsType> = memo(props => {

    return (
        <>
            {props.pack.name}
            <button onClick={() => props.remove(props.pack._id)}>remove</button>
        </>
    )
})


export const PackContainer = () => {
    const {packs, packsCount} = useSelector<AppRootStateType, PacksStateType>(state => state.packs);
    const dispatch = useDispatch();
    const meID = useSelector<AppRootStateType, string>(state => state.profile._id);

    useEffect(() => {
        // dispatch(getPacks({pageCount: 5}));
        dispatch(getPacks({page: 1, pageCount: 5}))
    }, [dispatch])

    const remove = (id: string) => {
        dispatch(removePack(id));
    }

    return (
        <>
           <TableForPacks packs={packs} packsCount={packsCount} remove={remove}/>
        </>
    )
}