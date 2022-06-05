import React, { Fragment, memo, useEffect, useState } from 'react'
import { Progress, Rate, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getThongTinPhim } from '../../redux/reducers/rapReducer';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;
function Detail(props) {
    const [tabPosition, setTabPosition] = useState('left');
    const {thongTinPhimChiTiet} = useSelector(rootReducer => rootReducer.rapReducer)
    console.log(thongTinPhimChiTiet);
    const dispatch = useDispatch()
    useEffect(() =>{
        // lấy tham số id khi chuyển page
        let{id} = props.match.params
        const action = getThongTinPhim(id);
        dispatch(action)
    },[])
   
  return (
    <section className='detail'>
        <div className="container">
            <div className="row">
            <div className="col-5">
                    <div className="content">
                        <div style={{backgroundImage: `url(${thongTinPhimChiTiet.hinhAnh})`}} className="detail__img"></div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="content">
                        <div className="detail__content">
                            <h1>{thongTinPhimChiTiet.tenPhim}</h1>
                            <span className='detail__date'>{moment( thongTinPhimChiTiet.ngayKhoiChieu).format('DD.MM.YYYY')}</span>
                            <p>{thongTinPhimChiTiet.moTa}</p>
                            <Progress width={100} type="circle" percent={`${thongTinPhimChiTiet.danhGia *10}`} />
                            <Rate className='ml-3' allowHalf   disabled defaultValue={5} />
                            <p className='d-inline-block ml-2'>
                             {(thongTinPhimChiTiet.danhGia / 2).toString()}
                            </p> 
                            <a target="_blank" href={`${thongTinPhimChiTiet.trailer}`} className='mt-4 btn btn-primary btn-trailer'>
                                XEM TRAILER
                            </a>

                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                <div className="content">
                    <div className="detail__tab">
                            <Tabs centered defaultActiveKey="1">
                            <TabPane  tab={
                                <h1 className='detailtab__title'>
                                    Lịch Chiếu
                                </h1>
                            } key="1">
                            <Tabs tabPosition={tabPosition}>
                                            {thongTinPhimChiTiet.heThongRapChieu?.map((rap, key) =>{
                                                return  <TabPane  key={key} tab={
                                                    <div  className="booking__cumrap" style={{width: "100px"}}>
                                                    <img src={rap.logo} width={70}/>   
                                                </div>}>
                                                {rap.cumRapChieu?.map((cumRap,key) =>{
                                                    return <div className='booking__film p-3' key={key}>
                                                        <h1 className='detailtab__subtitle'>{cumRap.tenCumRap}</h1>
                                                        <span>{cumRap.diaChi}</span>
                                                        <div className='grid grid-cols-6 gap-4'>
                                                        {cumRap.lichChieuPhim?.slice(0,5).map((lichChieu,key) =>{
                                                            return <NavLink key={key} className='mb-3 d-inline-block' to={`/booking/${lichChieu.maLichChieu}`}>{moment(lichChieu.ngayChieuGioChieu).locale("en").format("hh:mm A")}</NavLink>
                                                        })}
                                                        </div>
                                                    </div>
                                                })}
                                                </TabPane>
                                                
                                            })}
                                            
                                        </Tabs>
                            </TabPane>
                            </Tabs>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default memo(Detail)