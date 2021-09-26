import React, {FC, memo} from 'react';
import {Modal} from "./Modal";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {ModalType, setModalStatus, Status} from "../../components/statusApp/StatusAppReducer";
import {addPack, putPacks, removePack} from "../../components/packs/PacksReducer";
import {ParamsUpdatePack} from "../../api/PackAPI";
import {CardRequestType} from "../../api/CardsAPI";
import {addCards} from "../../components/cards/CardsReducer";
import {PackDataRequestType} from "../../app/requestDataReducerPacks";

export interface ModalActionsType {
    addNewPack: (newPackName: string) => void
    updatePack: (newPackName: string) => void
    addNewCard: (question: string, answer?: string) => void
    deletePack: () => void
    cancelModal: () => void
    backGroundOnClick: () => void
}

export const ModalContainer: FC = memo(() => {
    const modal = useSelector<AppRootStateType, ModalType>(state => state.statusApp.modal);
    const appStatus = useSelector<AppRootStateType, Status>(state => state.statusApp.status)
    const dataParams = useSelector<AppRootStateType, PackDataRequestType>(state => state.getPacksParams);
    const meId = useSelector<AppRootStateType, string>(state => state.profile._id);
    const dispatch = useDispatch();

    const modalActions: ModalActionsType = {
        addNewPack(newPackName: string) {
            if (modal.modalStatus === "add-pack") {
                const cardsName = {
                    name: newPackName,
                    private: false
                }
                dispatch(addPack(dataParams, cardsName, meId))
            }
        },
        updatePack(newPackName: string) {
            if (modal.modalStatus === "update") {
                if (modal.modalStatus === "update" && modal.itemID) {
                    let pack: ParamsUpdatePack = {
                        _id: modal.itemID,
                        name: newPackName
                    }
                    dispatch(putPacks(dataParams, pack))
                }
            }
        },
        deletePack() {
            if (modal.modalStatus === "delete" && modal.itemID) {
                dispatch(removePack(dataParams, modal.itemID))
            }
        },
        addNewCard(question: string, answer?: string) {
            if (modal.modalStatus === "add-card" && modal.itemID) {
                const card: CardRequestType = {
                    cardPack_id: modal.itemID,
                    question: question,
                    answer: answer
                }
                dispatch(addCards(card));
            }
        },
        cancelModal() {
            dispatch(setModalStatus("no-status", false, ''))
        },
        backGroundOnClick() {
            dispatch(setModalStatus('no-status', false, ''))
        }
    }

    return (
        <>
            {
                modal.modalStatus === 'no-status' ? <></> :
                    <Modal
                        modal={modal}
                        appStatus={appStatus}
                        modalActions={modalActions}
                    />
            }
        </>
    )
})