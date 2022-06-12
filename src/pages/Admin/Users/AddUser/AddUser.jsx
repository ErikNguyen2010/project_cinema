import React, { memo, useRef, useState } from 'react'
import {
    Form,
    Input,
    Select,
  } from 'antd';
import 'moment/locale/zh-cn';
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_ID } from '../../../../util/setting';
import { layDanhSachLoaiNguoiDung, themNguoiDung } from '../../../../redux/reducers/userReducer';
import { useEffect } from 'react';
 function AddUser(props) {
    const {loaiNguoiDung} = useSelector(rootReducer => rootReducer.userReducer)
    
    const dispatch = useDispatch()
    const addNewUserRef = useRef({
        taiKhoan: '',
        matKhau: '',
        maNhom: GROUP_ID,
        email: '',
        soDt: "",
        hoTen: "",
        maLoaiNguoiDung: "",
    })
    const handleChange = (e) =>{
        let {name,value} = e.target
        addNewUserRef.current[name] = value
    }
    const handleChangeLoaiNguoiDung = (e) =>{
      addNewUserRef.current.maLoaiNguoiDung = e
    }
    useEffect(() =>{
      const action = layDanhSachLoaiNguoiDung()
      dispatch(action)
    },[])
    const handleSubmit = (e) =>{
      const action = themNguoiDung(addNewUserRef.current)
      dispatch(action)
    }
    const renderLoaiNguoiDung = () =>{
      return loaiNguoiDung?.map((nguoiDung,key) =>{
        return  <Select.Option value={nguoiDung.maLoaiNguoiDung} key={key}>{nguoiDung.tenLoai}</Select.Option>
      })
    }
    const [componentSize, setComponentSize] = useState('default');
    
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };
  return (
    <section className='adduser'>
        <h1 className='text-center mb-5' style={{fontSize: "30px", fontWeight:"bold", color:"black"}}>Thêm Người Dùng</h1>
             <Form
                onFinish={handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                >
                <Form.Item label="Loại Người Dùng">
                  <Select placeholder="Chọn loại người dùng" onChange={handleChangeLoaiNguoiDung}>
                  {renderLoaiNguoiDung()}
                  </Select>
                </Form.Item>
                <Form.Item name="taiKhoan" label="Tài Khoản" rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                                whitespace: false,
                            },
                            ]}>
                    <Input onChange={handleChange} name='taiKhoan' placeholder='Tài khoản' />
                </Form.Item>
                <Form.Item label="Mật Khẩu"  name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                      hasFeedback>
                    <Input.Password onChange={handleChange} name='matKhau' placeholder='Mật khẩu' />
                </Form.Item>
                <Form.Item
                      name="confirm"
                      label="Nhập Lại Mật Khẩu"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password  placeholder='Nhập lại mật khẩu'/>
                    </Form.Item>
                <Form.Item label="Họ Tên">
                    <Input onChange={handleChange} name='hoTen' placeholder='Họ tên' />
                </Form.Item>
                <Form.Item name="email" label="Email " rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}>
                    <Input onChange={handleChange} name='email' placeholder='Email' />
              </Form.Item>
                <Form.Item label="Số Điện Thoại">
                    <Input onChange={handleChange} name='soDt' placeholder='Số điện thoại' />
                </Form.Item>
                
                <Form.Item>
                <button style={{marginLeft:"30%"}} className='btn-add btn btn-success' type='submit'>Xác Nhận</button>

                </Form.Item>
            </Form>
    </section>
  )
}


export default memo(AddUser)