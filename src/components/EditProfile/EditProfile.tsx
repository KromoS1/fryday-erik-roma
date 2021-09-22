import React, {ChangeEvent, FC, memo, useCallback, useRef, useState} from 'react';
import style from './EditProfile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {ProfileType} from "../profile/ProfileContainer";
import {useHistory} from "react-router-dom";
import {editProfileData} from "../profile/ProfileReducer";

interface PropsEditProfileType {
    name: string
    avatar: string
    save: (name: string) => void
    changeAvatar: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface ValueEdit {
    name: string
    avatar: string
}

const EditProfile: FC<PropsEditProfileType> = props => {
    const [name, setName] = useState<string>(props.name);
    const inRef = useRef<HTMLInputElement>(null);

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    }

    const submit = () => {
        props.save(name);
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.title}>Personal Information</div>
                <div className={style.Avatar}>
                    <img src={props.avatar} alt="#" style={{maxWidth: '200px'}}/>
                </div>
                <div>
                    <input ref={inRef}
                           type="file"
                           onChange={props.changeAvatar}
                           style={{display: 'none'}}
                    />
                    <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>
                </div>
                <div className={style.name}>
                    <div>{props.name}</div>
                    <input value={name} onChange={changeName}/>
                </div>
                <div>
                    <button type={'button'}>Cancel</button>
                    <button onClick={submit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export const EditProfileContainer = memo(() => {
    const profile = useSelector<AppRootStateType, ProfileType>(state => state.profile);
    let history = useHistory();
    const dispatch = useDispatch();
    const [, setFile] = useState({});
    const [fileURL, setFileURL] = useState(profile.avatar);
    const [file64, setFile64] = useState<string>();
    const [fileData, setFileData] = useState<FormData>();


    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const formData = new FormData();

        const newFile = event.target.files && event.target.files[0];
        if (newFile) {
            setFile(newFile)

            // formData.append('myFile',newFile,newFile.name);
            // reader.onloadend = () => {
            //     setFile64(reader.result)
            // }
            // reader.readAsDataURL(newFile)
            //
            // console.log(file64)

            setFileURL(URL.createObjectURL(newFile));
            // setFile64(btoa(fileURL))

            // console.log(text)
            // formData.append('myFile', newFile, newFile.name);
            // setFileData(formData);
            // reader.onloadend = () => {
            //     // reader.result &&
            //     setFile64(reader.result)
            // }
            // reader.readAsText(newFile);
        }
    }


    const save = useCallback((name: string) => {
        file64 && dispatch(editProfileData({name, avatar: file64}));
        history.push('/profile');
    }, [dispatch, fileURL]);

    return (
        <>
            {/*<img src={file64} alt=""/>*/}
            <EditProfile name={profile.name} avatar={fileURL} save={save} changeAvatar={changeAvatar}/>
        </>
    )
})