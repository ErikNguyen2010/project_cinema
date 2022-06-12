import moment from 'moment'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getThongTinTaiKhoanAPI } from '../../redux/reducers/userReducer'
import _ from "lodash"

 function HistoryBooking() {
    const {thongTinTaiKhoan} = useSelector(rootReducer => rootReducer.userReducer)
    const dispatch = useDispatch()
    useEffect(() =>{
        const action = getThongTinTaiKhoanAPI()
        dispatch(action)
    },[])
    const renderChiTiet = () =>{
        return thongTinTaiKhoan.thongTinDatVe?.map((phim,key) =>{
            let seats = _.first(phim.danhSachGhe)
            console.log(phim);
            return <div key={key} className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-600 border p-4 rounded-lg">
            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={`${phim.hinhAnh}`} />
            <div className="flex-grow">
                <h1 style={{textTransform: "uppercase"}} className="text-gray-900 title-font font-bold">{phim.tenPhim}</h1>
                <p style={{fontSize: "15px"}} className="text-gray-800 font-regular">{moment(phim.ngayDat).locale('en').format("DD:MM:YY hh:mm A")}</p>
                <p style={{fontSize: "15px"}} className="text-gray-800 font-regular">{seats.tenHeThongRap}</p>
                <span style={{fontSize: "15px"}} className="text-gray-800 font-regular">{seats.tenRap}</span>
                <br/>
                <br/>
                <span style={{fontSize: "15px"}} className="text-gray-800 font-regular">Ghế:</span>
                {phim.danhSachGhe?.slice(0,6).map((ghe,key) =>{
                return <span key={key} style={{fontSize: "15px"}} className="mx-2 text-gray-800 font-regular">{ghe.tenGhe}</span>
                })}

            </div>
            </div>
        </div>
        })
    }
  return (
    <section  className="history text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
            <h1 className="mt-5 sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">LỊCH SỬ ĐẶT VÉ</h1>
            </div>
            <div className="flex flex-wrap -m-2">
                {renderChiTiet()}
            </div>
        </div>
    </section>

  )
}

export default memo(HistoryBooking)