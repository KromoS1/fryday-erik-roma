import React, {useState} from 'react'
import {Form, Input, Select} from 'antd';
import style from './FieldComponentStyle.module.scss';

import { InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

export const fieldComponent = (name: string, placeholder: string, requiredMark?: string, setSelectState?: any) => {

    console.log(requiredMark)
    if (name === 'year') {
        return <Form.Item
            label={' '}
            className={style.field}
            name={name}
            rules={[
                {
                    required: true,
                    message: 'This field is required',
                },
                ({getFieldValue}) => ({
                    validator(_, value) {
                        console.log(getFieldValue('educationSelect'))
                        if (value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('You need choose year!'));
                    },
                }),
            ]}

            hasFeedback
            dependencies={['educationSelect']}
        >

            <Select
                size='large'
                showSearch
                style={{ width: 200, borderRadius: 12 }}
                placeholder="Select an year"
                optionFilterProp="children"
                className={style.input}
                value={requiredMark}
                defaultActiveFirstOption={true}
            >
                <Option value="1990">1990</Option>
                <Option value="1991">1991</Option>
                <Option value="1992">1992</Option>
            </Select>
        </Form.Item>
    } else if (name === 'university') {
        return <Form.Item
            label={' '}
            tooltip={{ title: 'Подсказка', icon: <InfoCircleOutlined /> }}
            className={style.field}
            name={name}
            rules={[
                {
                    required: true,
                    message: 'This field is required',
                },
            ]}
        >
            <Input placeholder={placeholder} size={'large'} className={style.input}/>
        </Form.Item>
    }
    else if (name === 'speciality') {
        return <Form.Item
            label={' '}
            tooltip={{ title: 'Подсказка', icon: <InfoCircleOutlined /> }}
            className={style.field}
            name={name}
            rules={[
                {
                    required: true,
                    message: 'This field is required',
                },
            ]}
            hasFeedback
        >
            <Input placeholder={placeholder} size={'large'} className={style.input}/>
        </Form.Item>
    }
    else if (name === 'qualification') {
        return <Form.Item
            label=" "
            tooltip={{ title: 'Подсказка', icon: <InfoCircleOutlined /> }}
            className={style.field}
            name={name}
            rules={[
                {
                    required: true,
                    message: 'Please input your qualification!',
                },
            ]}
        >
            <Input placeholder={placeholder} size={'large'} className={style.input}/>
        </Form.Item>
    }
    else if (name === 'dSeries') {
        return <Form.Item
            className={style.field}
            name={name}
            rules={[
                {
                    min: 8,
                    message: "Filed should be more than 8 character",
                },
            ]}
            hasFeedback
        >
            <Input placeholder={placeholder} size={'large'} className={style.input1}/>
        </Form.Item>
    }
    else if (name === 'dNumber') {
        return <Form.Item
            className={style.field}
            name={name}
            rules={[
                {
                    min: 4,
                    message: "Filed should be more than 4 character",
                },
            ]}
            hasFeedback
        >
            <Input placeholder={placeholder} size={'large'} className={style.input1}/>
        </Form.Item>
    }
    else if (name === 'educationSelect') {
        return <Form.Item
            label={' '}
            className={style.field}
            name={name}
            rules={[
                {
                    required: true,
                    message: 'Обязательное поле',
                },
            ]}

        >
        <Select
            size='large'
            showSearch
            style={{ width: 200, borderRadius: 12 }}
            placeholder="Select a universe"
            optionFilterProp="children"
            className={style.input}

            onChange={(value) => {
                console.log(value)
                switch(value) {
                    case 'jack' : {
                        setSelectState('1990');
                        break;
                    }
                    case 'lucy' : {
                        setSelectState('1991');
                        break;
                    }
                    case 'tom' : {
                        setSelectState('1992');
                        break;
                    }
                }

            }}
        >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>
    </Form.Item>
    }
    else if (name === 'confirm') {
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

            ]}
        >
            <Input.Password placeholder={placeholder} size={'large'} className={style.input}/>
        </Form.Item>
    }
}
