import React, { memo, useRef, useState } from 'react'
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
  } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { themPhim } from '../../../../redux/reducers/layDanhSachFilmReducer';
import { useDispatch } from 'react-redux';
import { GROUP_ID } from '../../../../util/setting';
 function AddNew(props) {
    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()
    const addNewRef = useRef({
        tenPhim: '',
        hinhAnh: '',
        moTa: '',
        ngayKhoiChieu: '',
        dangChieu: false,
        sapChieu: false,
        hot: false,
        danhGia: 0,
        hinhAnh: {},
        

    })
    const handleChange = (e) =>{
        let {name,value} = e.target
        addNewRef.current[name] = value
    }
    const handleChangeDatePicker = (e) =>{
        let ngayKhoiChieu = moment(e).format("DD/MM/YYYY");
        addNewRef.current.ngayKhoiChieu = ngayKhoiChieu
    }

    const handleChangeSwitch = (e) =>{
        return (value) =>{
            addNewRef.current[e] = value
        }
    }

    const handleChangeNumber = (e) =>{
        return (value) =>{
            addNewRef.current[e] = value
        }
    }

    const handleChangeFile = (e) =>{
        let file = e.target.files[0]
        if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/git"){
            let reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = (e) =>{
                setImgSrc(e.target.result)

            }
            addNewRef.current.hinhAnh = file
        }
    }
    const handleSubmit = (e) =>{
        addNewRef.current.maNhom = GROUP_ID
        let formData = new FormData()
        for(let key in addNewRef.current){
            if(key !== "hinhAnh"){
                formData.append(key,addNewRef.current[key])
            }else{
                formData.append("File", addNewRef.current.hinhAnh, addNewRef.current.hinhAnh.name)
            }
        }
        console.log(formData.get("File"));
        const action = themPhim(formData)
        dispatch(action)
    }
    const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <section className='addnew'>
        <h1 className='text-center mb-5' style={{fontSize: "30px", fontWeight:"bold", color:"black"}}>Thêm Films</h1>
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
                <Form.Item label="Tên Phim">
                    <Input onChange={handleChange} name='tenPhim' placeholder='Tên Phim' />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input onChange={handleChange} name='trailer' placeholder='Trailer' />
                </Form.Item>
                <Form.Item label="Mô Tả">
                    <Input onChange={handleChange} name='moTa' placeholder='Mô Tả' />
                </Form.Item>
                <Form.Item label="Ngày Khởi Chiếu">
                    <DatePicker defaultValue={moment('03/06/2022', 'DD/MM/YYYY')} onChange={handleChangeDatePicker} format={"DD/MM/YYYY"}/>
                </Form.Item>
                <Form.Item label="Đang Chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch("dangChieu")}  />
                </Form.Item>
                <Form.Item label="Sắp Chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch("sapChieu")} />
                </Form.Item>
                <Form.Item label="HOT" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch("hot")}/>
                </Form.Item>
                <Form.Item label="Số Sao">
                    <InputNumber onChange={handleChangeNumber("danhGia")} min={1} max={10} />
                </Form.Item>
                <Form.Item label="Hình Ảnh">
                    <input type="file" accept='image/png,image/jpg,image/jpeg,image/git' onChange={handleChangeFile}/>
                    <br/>
                    <img style={{width: '150px', height:"150px"}} src={imgSrc} alt="" />
                </Form.Item>
                <Form.Item>
                <button style={{marginLeft:"30%"}} className='btn-add btn btn-success' type='submit'>Xác Nhận</button>

                </Form.Item>
            </Form>
    </section>
  )
}

export default memo(AddNew)