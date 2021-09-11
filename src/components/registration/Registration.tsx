import React, {FC, memo, useCallback, useState} from 'react';
import style from './RegistrationStyle.module.scss'
import {Button, Checkbox, Form, Select, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';


import 'antd/dist/antd.css';
import {fieldComponent} from '../../commonComponents/commonComponentsForm/FieldComponent';
import {RequiredMark} from "antd/es/form/Form";

interface ValuesType {
    email: string
    password: string
    confirmPassword: string
}

interface PropsType {
    onSubmit: (data: ValuesType) => void
}


const FormRegistration: FC<PropsType> = memo(({onSubmit}) => {

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState<string>('optional');
    const [selectState, setSelectState] = useState<any>('1990')
    const onFinish = useCallback((values: ValuesType) => {
        onSubmit(values);
    }, [onSubmit]);

    return (
        <div className={style.registration}>
            <div className={style.title}>Education</div>
            <Form name={'register'}
                  className={style.form}

                  form={form}
                  onFinish={onFinish}>
                <div className={style.doubleInput}>
                    {fieldComponent('educationSelect', 'Education Select', selectState, setSelectState)}
                    {fieldComponent('year', 'E-mail')}
                </div>

                {fieldComponent('university', 'University')}

                <div className={style.doubleInput}>
                    {fieldComponent('dSeries', 'patent series')}
                    {fieldComponent('dNumber', 'patent number')}
                </div>
                {fieldComponent('speciality', 'Speciality')}
                {fieldComponent('qualification', 'Diploma qualification')}
                <Checkbox onChange={() => {}}>Checkbox</Checkbox>
                <div className={style.uploadContainer}>

                    <Upload
                        className={style.uploadListInline}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        style={{backgroundColor: 'red'}}
                    >
                        <Button>Upload</Button>
                    </Upload>

                </div>

                <div className={style.buttons}>
                    <button className={style.btnReg} type="submit">
                        Save
                    </button>

                    <button className={style.btnReg} type="reset" style={{backgroundColor: 'white', color: 'red'}}>
                        Cancel
                    </button>
                </div>
                <div className={style.footerText}>
                    <p className={style.text}>
                        <span style={{color: 'red'}}>*</span> Поля обезательные для заполнения
                    </p>

                    <p className={style.text}>
                        <span style={{color: 'yellow'}}>*</span> Поля видные для всех пользователе
                    </p>
                </div>
            </Form>
        </div>
    )
})

export const Registration = memo(() => {


    const sendData = useCallback((data: ValuesType) => {
        let {email, password} = data;
        console.log(email, password)
    }, [console]);

    return (
        <>
            <FormRegistration onSubmit={sendData}/>
        </>
    )
})