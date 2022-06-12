import React, { memo, useEffect, useRef, useState } from 'react'
import {useFormik} from 'formik'
import {
    Form,
    Input,
    Select,
  } from 'antd';
import 'moment/locale/zh-cn';
import { useDispatch, useSelector } from 'react-redux';
import { editNguoiDung, layThongTinNguoiDung } from '../../../../redux/reducers/userReducer';
function EditUser(props) {
    const dispatch = useDispatch()
   const {thongTinNguoiDung} = useSelector(rootReducer => rootReducer.userReducer)
   useEffect(() =>{
    let{taikhoan} = props.match.params
    const action = layThongTinNguoiDung(taikhoan)
    dispatch(action)
   },[])
    const formik = useFormik({
      enableReinitialize:true,
      initialValues:{
        taiKhoan: thongTinNguoiDung.taiKhoan,
        matKhau: thongTinNguoiDung.matKhau,
        email: thongTinNguoiDung.email,
        hoTen: thongTinNguoiDung.hoTen,
        soDT :thongTinNguoiDung.soDT,
        maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
        maNhom: "GP01",
      },
      onSubmit:(values) =>{
        const action = editNguoiDung(values)
        dispatch(action)
      
      }
    })

    const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <section className='addnew'>
        <h1 className='text-center mb-5' style={{fontSize: "30px", fontWeight:"bold", color:"black"}}>Edit Người Dùng</h1>
             <Form
                onSubmitCapture={formik.handleSubmit}
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
                <Select
                    placeholder={thongTinNguoiDung.loaiNguoiDung?.tenLoai}
                    style={{
                        width: 120,
                    }}
                    disabled
                    >
                </Select>
                </Form.Item>
                <Form.Item label="Tài Khoản">
                    <Input disabled onChange={formik.handleChange} name='taiKhoan' value={formik.values.taiKhoan} placeholder='Tài khoản' />
                </Form.Item>
                <Form.Item label="Mật Khẩu">
                    <Input.Password onChange={formik.handleChange} name='matKhau' value={formik.values.matKhau} placeholder='Mật khẩu' />
                </Form.Item>
                <Form.Item label="Email">
                    <Input onChange={formik.handleChange} name='email' value={formik.values.email} placeholder='Email' />
                </Form.Item>
                <Form.Item label="Họ Tên">
                    <Input onChange={formik.handleChange} name='hoTen' value={formik.values.hoTen} placeholder='Họ tên' />
                </Form.Item>
                <Form.Item label="Số Điện Thoại">
                    <Input onChange={formik.handleChange} name='soDT' value={formik.values.soDT} placeholder='Số điện thoại' />
                </Form.Item>
                <Form.Item>
                <button style={{marginLeft:"30%"}} className='btn-add btn btn-success' type='submit'>Xác Nhận</button>

                </Form.Item>
            </Form>
    </section>
  )
}

export default memo(EditUser)