import React from 'react'
import { Select } from 'antd';



  
export default function Options() {
    return (
    <section className='options'>
        <div className="container">
            <div className="row">
                <div className="col-12 options__container">
                    <select name="film" id="film">
                        <option value={""}>Chọn phim</option>
                        <option value={"1"}>Phim</option>
                    </select>
                    <select name="rap" id="rap">
                        <option value={""}>Chọn rạp</option>
                        <option value={"1"}>Phim</option>
                    </select>
                    <select name="date" id="date">
                        <option value={""}>Chọn ngày giờ</option>
                        <option value={"1"}>Phim</option>
                    </select>
                    <button className="btn btn-danger">ĐẶT VÉ NGAY</button>
                </div>
            </div>
        </div>
    </section>
  )
}



