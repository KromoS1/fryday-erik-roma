import React, {FC, memo, useCallback} from 'react';
import {Modal} from "./Modal";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {ModalType, setModalStatus} from "../../components/statusApp/StatusAppReducer";
import {DataRequestType} from "../../app/requestDataReducer";
import {addPack, putPacks, removePack} from "../../components/packs/PacksReducer";
import {ParamsUpdatePack} from "../../api/PackAPI";

export const ModalContainer: FC = memo(() => {
    const {
        modalStatus,
        isShow,
        itemID,
        itemName
    } = useSelector<AppRootStateType, ModalType>(state => state.statusApp.modal);

    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const meId = useSelector<AppRootStateType, string>(state => state.profile._id);
    const dispatch = useDispatch();

    const addNewPack = useCallback((newPackName: string) => {
        if (modalStatus === "add") {
            const cardsName = {
                name: newPackName,
                private: false
            }
            dispatch(addPack(dataParams, cardsName, meId))
        }
    }, [dispatch, modalStatus])

    const updatePack = useCallback((newPackName: string) => {
        if (modalStatus === "update") {
            if (typeof itemID === "string") {
                let pack: ParamsUpdatePack = {
                    _id: itemID,
                    name: newPackName
                }
                dispatch(putPacks(dataParams, pack))
            }
        }
    }, [dispatch, modalStatus])

    const deletePack = useCallback(() => {
        if (typeof itemID === "string") {
            dispatch(removePack(dataParams, itemID))
        }
    }, [dispatch, modalStatus])

    const cancelModal = useCallback(() => {
        dispatch(setModalStatus("no-status", false))
    },[dispatch])

    const backGroundOnClick = useCallback(() => {
        dispatch(setModalStatus('no-status', false))
    },[dispatch])

    return (
        <>
            {
                modalStatus === 'no-status' ? <></> :
                    <Modal
                        isShow={isShow}
                        modalStatus={modalStatus}
                        itemName={itemName}
                        addNewPack={addNewPack}
                        updatePack={updatePack}
                        deletePack={deletePack}
                        cancelModal={cancelModal}
                        backGroundOnClick={backGroundOnClick}
                    />
            }
        </>
    )
})