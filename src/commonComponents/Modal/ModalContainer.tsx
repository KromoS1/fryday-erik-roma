import React, {FC, memo, useCallback} from 'react';
import {Modal} from "./Modal";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {ModalType, setModalStatus} from "../../components/statusApp/StatusAppReducer";
import {DataRequestType} from "../../app/requestDataReducer";
import {addPack, putPacks, removePack} from "../../components/packs/PacksReducer";
import {ParamsUpdatePack} from "../../api/PackAPI";
import {CardRequestType} from "../../api/CardsAPI";
import {addCards} from "../../components/cards/CardsReducer";

export const ModalContainer: FC = memo(() => {
    const modal = useSelector<AppRootStateType, ModalType>(state => state.statusApp.modal);
    const dataParams = useSelector<AppRootStateType, DataRequestType>(state => state.getPacksParams);
    const meId = useSelector<AppRootStateType, string>(state => state.profile._id);
    const dispatch = useDispatch();

    const addNewPack = useCallback((newPackName: string) => {
        if (modal.modalStatus === "add-pack") {
            const cardsName = {
                name: newPackName,
                private: false
            }
            dispatch(addPack(dataParams, cardsName, meId))
        }
    }, [dispatch, modal.modalStatus, dataParams, meId]);

    const updatePack = useCallback((newPackName: string) => {
        if (modal.modalStatus === "update") {
            if (typeof modal.itemID === "string") {
                let pack: ParamsUpdatePack = {
                    _id: modal.itemID,
                    name: newPackName
                }
                dispatch(putPacks(dataParams, pack))
            }
        }
    }, [dispatch, modal.modalStatus, dataParams, modal.itemID]);

    const deletePack = useCallback(() => {
        if (modal.modalStatus === "delete" && modal.itemID) {
            dispatch(removePack(dataParams, modal.itemID))
        }
    }, [dispatch, dataParams, modal.itemID]);

    const addNewCard = useCallback((question: string) => {
        if (modal.modalStatus === "add-card" && modal.itemID) {
            const card: CardRequestType = {
                cardPack_id: modal.itemID,
                question: question,
            }
            dispatch(addCards(card));
        }
    }, [dispatch, modal.itemID])

    const cancelModal = useCallback(() => {
        dispatch(setModalStatus("no-status", false))
    }, [dispatch]);

    const backGroundOnClick = useCallback(() => {
        dispatch(setModalStatus('no-status', false))
    }, [dispatch]);

    return (
        <>
            {
                modal.modalStatus === 'no-status' ? <></> :
                    <Modal
                        isShow={modal.isShow}
                        modalStatus={modal.modalStatus}
                        itemName={modal.itemName}
                        addNewQuestion={addNewCard}
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