import React from 'react'
import {Form, Input} from 'antd';
import style from './FieldComponentStyle.module.scss';


export const fieldComponent = (name: string, placeholder: string) => {
    if (name === 'email') {
        return <Form.Item
            className={style.field}
            name={name}
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}>
            <Input placeholder={placeholder} size={'large'} className={style.input}/>
        </Form.Item>
    } else if (name === 'password') {
        return <Form.Item
            className={style.field}
            name={name}
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
            hasFeedback
        >
            <Input.Password placeholder={placeholder} size={'large'} className={style.input}/>
        </Form.Item>
    } else if (name === 'confirm') {
        return <Form.Item
            className={style.field}
            name={name}
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }

                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
            ]}
        >
            <Input.Password placeholder={placeholder} size={'large'} className={style.input}/>
        </Form.Item>
    }
}
