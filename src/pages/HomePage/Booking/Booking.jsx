import React, { memo } from "react";
import { Radio, Space, Tabs } from 'antd';
import { useState,useEffect  } from 'react';
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'
import { getThongTinRap } from "../../../redux/reducers/rapReducer";
import { render } from "react-dom";
import moment from "moment"
const { TabPane } = Tabs;


function Booking(props) {
    const [tabPosition, setTabPosition] = useState('left');
    const dispatch = useDispatch()
    useEffect(() =>{
      const action = getThongTinRap()
      dispatch(action)
    },[])
    console.log(props.arrRap);
    const renderRap = () =>{
      return props.arrRap?.map((rap, key) =>{
        return <TabPane tab={
          <div className="booking__logo">
            <img   src={rap.logo} style={{width: "50px", borderRadius:"50%", height: '50px'}}/>
          </div>
            }  key={key}>
                  <Tabs tabPosition={tabPosition}>
                        {rap.lstCumRap?.map((cumRap, key) =>{
                          return <TabPane key={key} tab={
                            <div className="booking__cumrap d-flex" style={{width: "400px"}}>
                              <img src={rap.logo} width={80}/>   
                              <div className="ml-3 text-left">
                                <h1 style={{fontSize:"15px", fontWeight:"700"}}>
                                 {cumRap.tenCumRap}
                                </h1>
                                <br/>
                                <span style={{color:"#000" ,fontSize: "14px"}}>
                                  {cumRap.diaChi.length>20?cumRap.diaChi.substr(0,30)+"...":cumRap.diaChi}
                                </span>
                              </div>
                            </div>
                            }>
                             {cumRap.danhSachPhim?.slice(0,5).map((phim,key) =>{
                               return<div className="booking__film d-flex mb-3" key={key}>
                                 <img src={phim.hinhAnh} onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; 
                                  currentTarget.src="https://i.pravatar.cc/300";
                                }} style={{width:"20%", height:"180px"}} alt="..." />
                                 <div className="ml-3">
                                  <h1 style={{fontSize: "28px", textTransform:"uppercase", fontWeight:"700"}}>{phim.tenPhim}</h1>
                                  <div className="grid grid-cols-6 gap-4 mt-5">
                                  {phim.lstLichChieuTheoPhim?.slice(0,12).map((lichChieu,key) =>{
                                    return <NavLink className="booking__giochieu ml-2"  to={`/detail/${phim.maPhim}`} key={key}>
                                        {moment(lichChieu.ngayChieuGioChieu).locale("en").format('hh:mm A')}
                                    </NavLink>
                                  })}
                                  </div>
                                 </div>
                               </div>
                             })}

                          </TabPane>
                        })}
                  </Tabs>
              </TabPane>
     

        
      })
    }
  return (
    <section id="booking" style={{paddingBottom:"100px"}} className="booking">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Tabs tabPosition={tabPosition}>
                  {renderRap()}
              </Tabs>
            </div>
          </div>
        </div>
    </section>
  );
}

export default memo(Booking)