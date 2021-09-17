import React, {ChangeEvent, FC, memo, useCallback, useRef, useState} from 'react';
import style from './EditProfile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/Store";
import {ProfileType} from "../profile/ProfileContainer";
import {fieldComponent} from "../../commonComponents/commonComponentsForm/FieldComponent";
import {Form} from "antd";
import {editProfileData} from "../profile/ProfileReducer";
import {formItemLayout} from "../registration/Registration";
import {useHistory} from "react-router-dom";

interface PropsEditProfileType {
    name: string
    avatar: string
    save: (values: ValuesType) => void
    changeAvatar: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface ValuesType {
    name: string
    avatar: string
}

const EditProfile: FC<PropsEditProfileType> = props => {
    const [form] = Form.useForm();
    const inRef = useRef<HTMLInputElement>(null);

    const onFinish = useCallback((values: ValuesType) => {
        props.save(values);
    }, [props]);

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.title}>Personal Information</div>
                <div className={style.Avatar}>
                    {props.avatar}
                </div>
                <Form name={'edit'}
                      {...formItemLayout}
                      form={form}
                      onFinish={onFinish}
                      initialValues={{name: props.name}}>
                    <div>
                        <input type="file"
                               ref={inRef}
                               onChange={() => props.changeAvatar}
                               style={{display: 'none'}}
                        />
                        <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>
                    </div>
                    <div className={style.name}>
                        <div>{props.name}</div>
                        {fieldComponent('name', 'Name')}
                    </div>
                    <div>
                        <button type={'button'}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export const EditProfileContainer = memo(() => {
    const profile = useSelector<AppRootStateType, ProfileType>(state => state.profile);
    let history = useHistory();
    const dispatch = useDispatch();
    const [file, setFile] = useState({});
    const [fileURL, setFileURL] = useState('');

    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files && event.target.files[0];
        if (newFile) {
            setFile(newFile)
            setFileURL(URL.createObjectURL(newFile));
            debugger
            console.log(fileURL)
        }
    }

    const save = useCallback((data: ValuesType) => {
        dispatch(editProfileData(data));
        // history.push('/profile');
    }, [dispatch, history]);

    return (
        <>
            <EditProfile name={profile.name} avatar={profile.avatar} save={save} changeAvatar={changeAvatar}/>
        </>
    )
})