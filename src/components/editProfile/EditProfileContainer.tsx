import React, {ChangeEvent, memo, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {ProfileType} from "../profile/ProfileContainer";
import {useHistory} from "react-router-dom";
import {editProfileData} from "../profile/ProfileReducer";
import {EditProfile} from "./EditProfile";
import avatarName from '../../resources/images/avatarNote.png'

export const EditProfileContainer = memo(() => {
    const profile = useSelector<AppRootStateType, ProfileType>(state => state.profile);
    let history = useHistory();
    const dispatch = useDispatch();
    const [url, setUrl] = useState<string>(profile.avatar);

    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        const newFile = event.target.files && event.target.files[0];
        if (newFile) {
            reader.onloadend = function (){
                if (typeof reader.result === 'string'){
                    setUrl(reader.result);
                }
            }
            reader.readAsDataURL(newFile);
        }
    }

    const save = useCallback((name: string) => {
        dispatch(editProfileData({name, avatar: avatarName}));
        history.push('/profile');
    }, [dispatch, url]);

    const cancel = useCallback(() => {
        history.push('/profile')
    },[]);

    return (
        <>
            <EditProfile name={profile.name} avatar={url} save={save} changeAvatar={changeAvatar} cancel={cancel}/>
        </>
    )
})