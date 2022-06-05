import React, { useRef } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, } from 'antd';
import {useDispatch} from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { userLoginAPI } from '../../redux/reducers/userReducer';
import { USER_LOGIN } from '../../util/setting';


export default function Login(props) {
  const [form] = Form.useForm();
  console.log(form);
  
  const userLoginRef = useRef({
    taiKhoan: "",
    matKhau: "",
  })
  const dispatch = useDispatch()
  const handleSubmit = (event) =>{
    const action = userLoginAPI(userLoginRef.current)
    dispatch(action)
  }
  const handleChange = (event) =>{
    let {id,value} = event.target
    userLoginRef.current[id] = value
    console.log(userLoginRef.current);
  }
  if(localStorage.getItem(USER_LOGIN)){
    alert("Bạn đã đăng nhập rồi!")
    return <Redirect to="/"/>
}
  return (
    <section className="login" style={{backgroundColor: "#f7f7f7"}}>
    <div className='container'>
      <div className="row">
        <div className="col-12">
          <div className="content">
          <div className="site-card-border-less-wrapper">
              <Card
              bordered={true}
              style={{width: "40%", margin: "0 auto", boxShadow: "0 0 8px #95979d"}}>
              <h1 className='login__header mb-4'>Đăng Nhập</h1>
                      <div className='login__apps'>
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
                      <div className="login__separator">
                          <span>Hoặc</span>
                      </div>
                      </div>
                      <Form preserve={false}
                      name="normal_login"
                      form={form}
                      className="login-form"
                      onFinish={handleSubmit}
                      initialValues={{
                      remember: true,
                      }}
                  >
                      <Form.Item
                      name="taiKhoan"
                      rules={[
                          {
                          required: true,
                          message: 'Xin hãy nhập tài khoản!',
                          whitespace: false,
                          },
                      ]}
                      >
                      <Input id='taiKhoan' onChange={handleChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tài khoản" />
                      </Form.Item>
                      <Form.Item
                      name="password"
                      rules={[
                          {
                          required: true,
                          message: 'Xin hãy nhập mật khẩu!',
                          },
                      ]}
                      >
                      <Input id='matKhau' onChange={handleChange}
                          
                          prefix={<LockOutlined className="site-form-item-icon" />}
                          type="password"
                          placeholder="Mật khẩu"
                      />
                      </Form.Item>
                      <Form.Item>
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>Nhớ tài khoản</Checkbox>
                      </Form.Item>

                      <a className="login-form-forgot" href="">
                          Quên mật khẩu
                      </a>
                      </Form.Item>

                      <Form.Item>
                      <Button  htmlType='submit' className="login-form-button">
                          Tiếp tục
                      </Button>
                      <div className="login__separator">
                      </div>
                      <div className='text-center'>
                          <span className='login__text'>Không phải là thành viên?</span> 
                          <NavLink  className='login__register' to="/register">Đăng ký ngay!</NavLink>
                      </div>
                      </Form.Item>
                  </Form>
              </Card>
          </div>
          </div>
        </div>
      </div>
    </div>
    
      </section>
  )
}
