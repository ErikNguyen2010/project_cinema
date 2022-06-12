import React, { Fragment, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { datGhe, datGheAPI, datVe, getDanhSachPhongVe } from '../../redux/reducers/bookingReducer'
import { USER_LOGIN } from '../../util/setting'
import {CloseOutlined, TrophyOutlined , AndroidOutlined} from '@ant-design/icons'
import _ from 'lodash'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
function BookingTicket(props) {
   
  const {userLogin} = useSelector(rootReducer => rootReducer.userReducer)
  const {danhSachPhongVe, arrDatVe} = useSelector(rootReducer => rootReducer.bookingReducer)

  let {id} = props.match.params
  const dispatch = useDispatch()

  useEffect(()=>{
    const action = getDanhSachPhongVe(id)
    dispatch(action)
  },[])

  
    if(!localStorage.getItem(USER_LOGIN)){
        alert("Bạn hãy đăng nhập trước!")
        return <Redirect to="/login"/>
    }

    let{danhSachGhe, thongTinPhim} = danhSachPhongVe
    const renderTongTien = () =>{
      let sum = 0;
      for(let index of arrDatVe){
        sum += index.giaVe
      }
      return sum
    }
    const renderGhe = () =>{
      return danhSachGhe?.map((ghe,key) =>{

        let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
        let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
        let classGheDangDat = ''
        let classGheKhachDat = ""


        let index = arrDatVe.findIndex(gheDangDat => gheDangDat.maGhe === ghe.maGhe)
        if(index !== -1){
          classGheDaDat = "gheDangDat"
        }



        let classGheDaDuocDat = "";
        if(userLogin.taiKhoan == ghe.taiKhoanNguoiDat){
          classGheDaDuocDat = "gheDaDuocDat"
        }

        return <Fragment key={key}>
          <button onClick={() =>{
            const action = datVe(ghe)
            dispatch(action)
          }} disabled={ghe.daDat || classGheKhachDat} style={{color:"white", fontSize:"16px", fontWeight:"bold"}} className={`ghe ${classGheKhachDat} ${classGheDaDuocDat} ${classGheDaDat} ${classGheVip} ${classGheDangDat}`}>
            {ghe.daDat ? <CloseOutlined /> : classGheKhachDat !== "" ?  <AndroidOutlined />: ghe.stt}
            </button>
          { (key+1) % 14 === 0 ? <br/> : ""}
        </Fragment> 
      })
    }
  return (
    <section className='bookingTicket min-h-screen'>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="content mr-3">
              <div className='d-flex flex-column text-center'>
                <div className='w-full bg-dark' style={{height: "10px"}}>
                </div>
                <div className="screen">
                    <span className='manHinh'>Màn hình</span>
                </div>
                <div>
                  {renderGhe()}
                </div>
              </div>

            </div>
            <div className='mt-5 d-flex justify-content-center'>
              <table className='divide-y divide-gray-200 w-full'>
                <thead className='bg-gray-50 p-5'>
                  <tr style={{fontSize:"18px"}}>
                    <th>Ghế chưa đặt</th>
                    <th>Ghế đang đặt</th>
                    <th>Ghế VIP</th>
                    <th>Ghế đã được đặt</th>
                    <th>Ghế đã được bạn đặt</th>
                    <th>Ghế người khác đang đặt</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  <tr>
                    <td>
                      <button style={{cursor:"no-drop", color:"white", fontWeight:"bold", fontSize:"20px"}} disabled className='ghe text-center'><TrophyOutlined className='mb-4' /></button>
                    </td>
                    <td>
                      <button style={{cursor:"no-drop", color:"white", fontWeight:"bold", fontSize:"20px"}} disabled className='ghe gheDangDat text-center'><TrophyOutlined className='mb-4' /></button>
                    </td>
                    <td>
                      <button style={{cursor:"no-drop", color:"white", fontWeight:"bold", fontSize:"20px"}} disabled className='ghe gheVip text-center'><TrophyOutlined className='mb-4' /></button>
                    </td>
                    <td>
                      <button style={{cursor:"no-drop", color:"white", fontWeight:"bold", fontSize:"20px"}} disabled className='ghe gheDaDat text-center'><TrophyOutlined className='mb-4' /></button>
                    </td>
                    <td>
                      <button style={{cursor:"no-drop", color:"white", fontWeight:"bold", fontSize:"20px"}} disabled className='ghe gheDaDuocDat text-center'><TrophyOutlined className='mb-4' /></button>
                    </td>
                    <td>
                      <button style={{cursor:"no-drop", color:"white", fontWeight:"bold", fontSize:"20px"}} disabled className='ghe gheNguoiKhacDangDat text-center'><TrophyOutlined className='mb-4' /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-3 h-full">
            <div className="content h-full">
                <h1 className='text-center' style={{fontSize: "40px", fontWeight: "bold", color:"green"}}>{renderTongTien().toLocaleString()} VNĐ</h1>
                <hr/>
                <h1 className='my-3'>{thongTinPhim?.tenPhim}</h1>
                <span className='my-2 d-block'>{thongTinPhim?.diaChi}</span>
                <br/>
                <span className='d-block mb-3'>{thongTinPhim?.ngayChieu}</span>
                <span className='d-block mb-3'>{thongTinPhim?.gioChieu}</span>
                <hr/>
              <div className='d-flex mt-3 justify-content-between'>
                <p style={{color: "black"}}>Ghế:</p>
                
                  {_.sortBy(arrDatVe,["stt"])?.map((ghe,key) =>{
                    return  <span key={key} className="mr-2" style={{fontSize: "20px", color:"green"}}>
                      {ghe.stt}
                </span>
                  })}
              </div>
              <hr/>
              <div className='d-flex mt-3 justify-content-between '>
                <p>Email:</p>
                <span className='ml-3 mt-1'>{userLogin.email}</span>
              </div>
              <hr/>
              <div className='d-flex mt-3 justify-content-between '>
                <p>Phone:</p>
                <span>{userLogin.soDT}</span>
              </div>
              <button onClick={() =>{
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id
                thongTinDatVe.danhSachVe = arrDatVe
               
                const action =  datGheAPI(thongTinDatVe)
                dispatch(action)

              }} className=" w-full btn btn-success">Đặt vé</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(BookingTicket)


