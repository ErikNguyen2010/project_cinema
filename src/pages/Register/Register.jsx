import React from 'react'
import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
    Modal,
    Card,
  } from 'antd';
import { useState, useRef } from 'react';
import {useDispatch} from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { userRegisterAPI } from '../../redux/reducers/userReducer';
import { USER_LOGIN } from '../../util/setting';
const { Option } = Select;

const formItemLayout = {
labelCol: {
    xs: {
    span: 24,
    },
    sm: {
    span: 8,
    },
},
wrapperCol: {
    xs: {
    span: 24,
    },
    sm: {
    span: 16,
    },
},
};
const tailFormItemLayout = {
wrapperCol: {
    xs: {
    span: 24,
    offset: 0,
    },
    sm: {
    span: 16,
    offset: 8,
    },
},
};

export default function Register() {
    const [form] = Form.useForm();



const prefixSelector = (
<Form.Item name="prefix" noStyle>
    <Select
    style={{
        width: 70,
    }}
    >
    <Option value="84">+84</Option>
    </Select>
</Form.Item>
);
const userRegisterRef = useRef({
    taiKhoan: "",
    matKhau: "",
    email:"",
    soDT: "" ,
    hoTen: "",
})
const dispatch = useDispatch()
const handleChange = (e) =>{
    let {value, id} = e.target
    userRegisterRef.current[id] = value
    console.log(userRegisterRef.current);
}
const handleSubmit = (e) =>{
    const action = userRegisterAPI(userRegisterRef.current)
    dispatch(action)
}
if(localStorage.getItem(USER_LOGIN)){
    return <Redirect to="/login"/>
}
  return (
    <section className='register' style={{backgroundColor: "#f7f7f7"}}>
         <div className='container'>
        <div className="row">
          <div className="col-12">
            <div className="content">
            <div className="site-card-border-less-wrapper">
              <Card
              bordered={true}
              style={{width: "40%", margin: "0 auto", boxShadow: "0 0 8px #95979d"}}>
            <h1 className='register__header mb-4'>Đăng ký</h1>
                    <div className='register__apps'>
                      <a href="https://www.facebook.com/" className='btn-facebook btn btn-primary'>
                        <i className='fab fa-facebook'></i>
                        Đăng nhập bằng tài khoản Facebook
                      </a>
                      <br/>
                      <a href="https://www.gmail.com/" className='btn-google btn btn-primary'>
                        <i className="fa-brands fa-google"></i>
                        Đăng nhập bằng tài khoản Google
                      </a>
                      <br/>
                      <a href="https://www.gmail.com/" className='btn-google btn btn-primary'>
                        <i className="fa-brands fa-apple"></i>
                        Đăng nhập bằng tài khoản Apple
                      </a>
                      <div className="register__separator">
                        <span>Hoặc</span>
                      </div>
                    </div>
                    <div className="register__form">
                        <Form
                            preserve={false}
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={handleSubmit}
                            scrollToFirstError
                            initialValues={{
                                prefix: '84',
                            }}
                            >
                            <Form.Item
                            name="taiKhoan"
                            label="Tài khoản"
                            rules={[
                            {
                                required: true,
                                message: 'Xin hãy nhập tài khoản!',
                                whitespace: false,
                            },
                            ]}
                        >
                            <Input id='taiKhoan' onChange={handleChange} placeholder="Tài khoản" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                {
                                    type: 'email',
                                    message: 'Email không đúng',
                                },
                                {
                                    required: true,
                                    message: 'Xin hãy nhập email!',
                                },
                                ]}
                            >
                             <Input id='email' onChange={handleChange} placeholder="Email" />

                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Mật khẩu"
                                rules={[
                                {
                                    required: true,
                                    message: 'Xin hãy nhập mật khẩu!',
                                },
                                ]}
                                hasFeedback
                            >
                                 <Input.Password  id='matKhau' onChange={handleChange} placeholder="Mật khẩu" />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Nhập lại mật khẩu"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                {
                                    required: true,
                                    message: 'Xin hãy nhập lại mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('Hai mật khẩu phải giống nhau'));
                                    },
                                }),
                                ]}
                            >
                                 <Input.Password  id='matKhau' onChange={handleChange} placeholder="Mật khẩu" />
                            </Form.Item>

                            <Form.Item
                                name="username"
                                label="Tên"
                                tooltip="What do you want others to call you?"
                                rules={[
                                {
                                    required: true,
                                    message: 'Xin hãy nhập tên!',
                                    whitespace: true,
                                },
                                ]}
                            >
                                <Input id='hoTen' onChange={handleChange} placeholder="Tên" />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label="Số Điện Thoại"
                                rules={[
                                {
                                    required: true,
                                    message: 'Xin hãy nhập số điện thoại!',
                                },
                                ]}
                            >
                                <Input
                                 onChange={handleChange}
                                id="soDT"
                                placeholder="Số điện thoại"
                                addonBefore={prefixSelector}
                                style={{
                                    width: '100%',
                                }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                {
                                    validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                                ]}
                                {...tailFormItemLayout}
                            >
                                <Checkbox>
                                Tôi đồng ý với <a href="" className='register__agree'>các điều khoản</a>
                                </Checkbox>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button className='register__btn' htmlType="submit">
                                Đăng ký
                                </Button>
                                <div className="register__separator2">
                                </div>
                                <div>
                                    <span className='register__text'>Bạn đã có tài khoản?</span> 
                                    <NavLink className='register__register' to="/login">Đăng nhập ngay!</NavLink>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
            </Card>
            </div>
            </div>
          </div>
        </div>
      
      </div>
    </section>
  )
}
