import React, { memo, useEffect, useRef, useState } from 'react'
import {
    Form,
    Select,
    DatePicker,
    InputNumber,
  } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { useDispatch, useSelector } from 'react-redux';
import { getThongTinCumRap, getThongTinHeThongRap } from '../../../redux/reducers/rapReducer';
import { taoLichChieu } from '../../../redux/reducers/bookingReducer';
import { layThongTinPhimAPI } from '../../../redux/reducers/layDanhSachFilmReducer';
 function ShowTime(props) {
  const {heThongRap,cumRap} = useSelector(rootReducer => rootReducer.rapReducer)
  const {thongTinPhim} = useSelector(rootReducer => rootReducer.layDanhSachFilmReducer)
  console.log(thongTinPhim);
  useEffect(() =>{
    const action = getThongTinHeThongRap()
    dispatch(action)
    dispatch(layThongTinPhimAPI(props.match.params.id))
  },[])
  const renderHeThongRap = () =>{
    return heThongRap?.map((rap,key)=>{
      return <Select.Option key={key} value={rap.maHeThongRap}>{rap.tenHeThongRap}</Select.Option>
    })
  }
  const renderCumRap = () =>{
    return cumRap?.map((rap,key) =>{
      return <Select.Option value={rap.maCumRap} key={key}>{rap.tenCumRap}</Select.Option>
    })
  }
    const dispatch = useDispatch()
    const addLichChieuRef = useRef({
        maPhim: props.match.params.id,
        ngayChieuGioChieu: "",
        maRap: "",
        giaVe: 0,
    })
    const handleChange = (e) =>{
      const action = getThongTinCumRap(e)
      dispatch(action)
    }
    const handleChangeCumRap = (e) =>{
      addLichChieuRef.current.maRap = e
      
    }
    const onChangeDate = (e) =>{
      console.log(e);
      let ngayKhoiChieu = moment(e).format("DD/MM/YYYY HH:mm:ss");
      addLichChieuRef.current.ngayChieuGioChieu = ngayKhoiChieu
    }
    
    const onOk = (e) =>{
      let ngayKhoiChieu = moment(e).format("DD/MM/YYYY HH:mm:ss");
      addLichChieuRef.current.ngayChieuGioChieu = ngayKhoiChieu
    }
    
    const handleChangeNumber = (e) =>{
      return (value) =>{
        addLichChieuRef.current[e] = value
      }
    }
    
    const handleSubmit = (e) =>{
        const action = taoLichChieu(addLichChieuRef.current)
        dispatch(action)
 
    }
    const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
    
  };
  const range = (start, end) => {
    const result = [];
  
    for (let i = start; i < end; i++) {
      result.push(i);
    }
  
    return result;
  }
  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  };
  


  
  return (
    <section className='showtime'>
      <div className='d-flex justify-content-center align-items-center flex-column mb-5'>
        <h1 className='mb-2' style={{fontSize: "30px", fontWeight:"bold", color:"black"}}>Thêm Lịch Chiếu - {props.match.params.tenphim}</h1>
        <img className='' src={thongTinPhim.hinhAnh} alt="..." width={200} height={200} />
      </div>
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
                <Form.Item label="Hệ Thống Rạp">
                  <Select placeholder="Chọn hệ thống rạp" onChange={handleChange}>
                    {renderHeThongRap()}
                  </Select>
                </Form.Item>
                <Form.Item  label="Cụm Rạp">
                  <Select placeholder="Chọn cụm rạp" onChange={handleChangeCumRap}>
                    {renderCumRap()}
                  </Select>
                </Form.Item>
                <Form.Item label="Ngày Khởi Chiếu">
                <DatePicker
                    onOk={onOk}
                    onChange={onChangeDate}
                    placeholder='Chọn ngày giờ chiếu'
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={disabledDate}
                    showTime={{
                      defaultValue: moment('00:00:00', 'HH:mm:ss'),
                    }}
                  />

                </Form.Item>
                <Form.Item label="Số Tiền">
                    <InputNumber  onChange={handleChangeNumber("giaVe")} min={75000} max={100000} />
                </Form.Item>
                <Form.Item>
                <button style={{marginLeft:"30%"}} className='btn-add btn btn-success' type='submit'>Xác Nhận</button>

                </Form.Item>
            </Form>
    </section>
  )
}

export default memo(ShowTime)
