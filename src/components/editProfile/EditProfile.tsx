import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent, FC, useRef} from 'react';
import style from './EditProfile.module.scss'
import {FieldComponent} from "../../commonComponents/commonComponentsForm/FieldComponent";
import {Form} from "antd";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";

interface PropsEditProfileType {
    name: string
    avatar: string
    save: (name: string) => void
    cancel: () => void
    changeAvatar: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface ValueEdit {
    name: string
    avatar: string
}

export const EditProfile: FC<PropsEditProfileType> = props => {
    const inRef = useRef<HTMLInputElement>(null);
    const [form] = Form.useForm();

    const submit = (data: { name: string }) => {
        props.save(data.name);
    }

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.title}>Personal Information</div>
                <div className={style.boxAvatar}>
                    <img src={props.avatar} alt="#" className={style.avatar}/>
                    <input ref={inRef}
                           type="file"
                           onChange={props.changeAvatar}
                           style={{display: 'none'}}/>
                    <FontAwesomeIcon icon={faCamera}
                                     onClick={() => inRef && inRef.current && inRef.current.click()}
                                     className={style.btnAddIcon}/>
                </div>
                <Form name={'name'} form={form} onFinish={submit} initialValues={{name: props.name}} className={style.form}>
                    <div className={style.nick}>Nickname</div>
                    {FieldComponent('name', 'Name', props.name)}
                   <div className={style.buttons}>
                       <button type={'button'} onClick={props.cancel} className={style.cancelBtn}>Cancel</button>
                       <button type={'submit'} className={style.saveBtn}>Save</button>
                   </div>
                </Form>
            </div>
        </div>
    )
}