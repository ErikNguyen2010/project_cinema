import React, { useEffect } from "react";
import { Carousel, Icon } from 'antd';
import ReactDOM, { render } from "react-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { getBanner } from "../../../redux/reducers/layDanhSachFilmReducer";


export default function CarouselHome(props) {
  const dispatch = useDispatch()

  useEffect(() =>{
    const action = getBanner()
    dispatch(action)
  },[])
  const renderBanner = () =>{
   return props.banners.map((banner,key) =>{
      return  <div key={key}>
      <div style={{backgroundImage: `url(${banner.hinhAnh})`}} className="carousel-bg">
      </div>
      </div>
    })
  }
  return (
      <section className="carousel">
        <Carousel autoplay arrows={true} prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
            {renderBanner()}
        </Carousel>
      </section>
  );
}


