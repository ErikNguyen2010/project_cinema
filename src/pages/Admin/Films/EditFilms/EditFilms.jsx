import React, { useEffect, useRef, useState } from 'react'
import {useFormik} from 'formik'
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
  } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { editPhimAPI, layThongTinPhimAPI, themPhim } from '../../../../redux/reducers/layDanhSachFilmReducer';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
 function EditFilm(props) {
    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()
   const {thongTinPhim} = useSelector(rootReducer => rootReducer.layDanhSachFilmReducer)
   useEffect(() =>{
    let{id} = props.match.params
    const action = layThongTinPhimAPI(id)
    dispatch(action)
   },[])
    const formik = useFormik({
      enableReinitialize:true,
      initialValues:{
        maPhim: thongTinPhim.maPhim,
        tenPhim: thongTinPhim.tenPhim,
        moTa: thongTinPhim.moTa,
        trailer: thongTinPhim.trailer,
        ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
        dangChieu: thongTinPhim.dangChieu,
        sapChieu: thongTinPhim.sapChieu,
        hot: thongTinPhim.hot,
        danhGia: thongTinPhim.danhGia,
        hinhAnh: null,
        maNhom: "GP01",
      },
      onSubmit:(values) =>{
        let formData = new FormData()
        for(let key in values){
            if(key !== "hinhAnh"){
                formData.append(key,values[key])
            }else{
              if(values.hinhAnh !== null){
                formData.append("File", values.hinhAnh, values.hinhAnh.name)
              }
            }
        }
        const action = editPhimAPI(formData)
        dispatch(action)
      }
    })

    const handleChangeDatePicker = (e) =>{
        let ngayKhoiChieu = moment(e);
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    }

    const handleChangeSwitch = (name) =>{
      return(value)=>{
        formik.setFieldValue(name, value)
      }
    }

    const handleChangeNumber = (e) =>{
        return (value) =>{
          formik.setFieldValue(e,value)
        }
    }
    const dateFormat = 'DD/MM/YYYY';

    const handleChangeFile = async (e) =>{
        let file = e.target.files[0]
        if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/git"){
          await formik.setFieldValue('hinhAnh',file)
            let reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = (e) =>{
                setImgSrc(e.target.result)

            }
        }
    }

    const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <section className='addnew'>
        <h1 className='text-center mb-5' style={{fontSize: "30px", fontWeight:"bold", color:"black"}}>Edit Films</h1>
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
                <Form.Item label="T??n Phim">
                    <Input onChange={formik.handleChange} name='tenPhim' value={formik.values.tenPhim} placeholder='T??n Phim' />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input onChange={formik.handleChange} name='trailer' value={formik.values.trailer} placeholder='Trailer' />
                </Form.Item>
                <Form.Item label="M?? T???">
                    <Input onChange={formik.handleChange} name='moTa' value={formik.values.moTa} placeholder='M?? T???' />
                </Form.Item>
                <Form.Item label="Ng??y Kh???i Chi???u">
                    <DatePicker     format={dateFormat}
                                  value={moment(formik.values.ngayKhoiChieu)} onChange={handleChangeDatePicker}/>
                </Form.Item>
                <Form.Item label="??ang Chi???u" valuePropName="checked">
                    <Switch  checked={formik.values.dangChieu} onChange={handleChangeSwitch("dangChieu")}  />
                </Form.Item>
                <Form.Item label="S???p Chi???u" valuePropName="checked">
                    <Switch  checked={formik.values.sapChieu} onChange={handleChangeSwitch("sapChieu")} />
                </Form.Item>
                <Form.Item label="HOT" valuePropName="checked">
                    <Switch checked={formik.values.hot} onChange={handleChangeSwitch("hot")}/>
                </Form.Item>
                <Form.Item label="S??? Sao">
                    <InputNumber value={formik.values.danhGia} onChange={handleChangeNumber("danhGia")} min={1} max={10} />
                </Form.Item>
                <Form.Item label="H??nh ???nh">
                    <input  type="file" accept='image/png,image/jpg,image/jpeg,image/git' onChange={handleChangeFile}/>
                    <br/>
                    <img style={{width: '150px', height:"150px"}} src={imgSrc==="" ? thongTinPhim.hinhAnh : imgSrc} alt="" />
                </Form.Item>
                <Form.Item>
                <button style={{marginLeft:"30%"}} className='btn-add btn btn-success' type='submit'>X??c Nh???n</button>

                </Form.Item>
            </Form>
    </section>
  )
}


export default memo(EditFilm)