import React, {FC, memo, useCallback} from 'react';
import {Modal} from "./Modal";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {ModalType, setModalStatus} from "../../components/statusApp/StatusAppReducer";
import {InputModal} from "./ModalComponents/InputModal/InputModal";
import {DeleteModal} from "./ModalComponents/Delete/DeleteModal";
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

    const packActions = useCallback((newPackName: string) => {
        if (modalStatus === "add") {
            const cardsName = {
                name: newPackName,
                private: false
            }
            dispatch(addPack(dataParams, cardsName, meId))
        }
        if (modalStatus === "update") {
            if (typeof itemID === "string") {
                let pack: ParamsUpdatePack = {
                    _id: itemID,
                    name: newPackName
                }
                dispatch(putPacks(dataParams, pack))
            }
        }
    }, [dispatch])

    const deletePack = useCallback(() => {
        if (typeof itemID === "string") {
            dispatch(removePack(dataParams, itemID))
        }
    }, [dispatch])

    const cancelModal = useCallback(() => {
        dispatch(setModalStatus("no-status", false))
    }, [dispatch])

    const setModal = () => {
        switch (modalStatus) {
            case "add":
                return <InputModal
                    status={modalStatus}
                    packActions={packActions}
                    cancelModal={cancelModal}
                />
            case "update":
                return <InputModal
                    status={modalStatus}
                    packActions={packActions}
                    cancelModal={cancelModal}
                />
            case "delete":
                return <DeleteModal
                    packName={itemName}
                    deletePack={deletePack}
                    cancelModal={cancelModal}
                />
            default:
                return <></>
        }
    }

    const backGroundOnClick = () => {
        dispatch(setModalStatus('no-status', false))
    }

    return (
        <>
            {
                modalStatus === 'no-status' ? <></> :
                    <Modal
                        isShow={isShow}
                        backGroundOnClick={backGroundOnClick}
                    >
                        {setModal()}
                    </Modal>
            }

        </>
    )
})