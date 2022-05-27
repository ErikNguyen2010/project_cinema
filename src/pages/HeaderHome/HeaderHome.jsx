import React from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


export default function HeaderHome(props) {
  return (
    <header className='header'>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="content">
                <div className='header__logo'>
                  <a href="">
                    <img src="./image/cgv-logo.jpg" alt="..." />
                  </a>
                </div>
              </div>    
            </div>
            <div className="col-4">
              <div className="content">
                <nav className="navbar">
                  <a href="">Lịch Chiếu</a>
                  <a href="">Cụm Rạp</a>
                  <a href="">Tin Tức</a>
                  <a href="">Ứng Dụng</a>
                </nav>
              </div>
            </div>
            <div className="col-4" style={{textAlign:"center"}}>
              <div className="content">
                <div className="header__login">
                    <a href="">
                    <i class="fa fa-user-circle"></i>
                      Đăng Nhập
                    </a>
                    <a href="">
                    <i class="fa fa-user-circle"></i>
                      Đăng Ký
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </header>
  )
}
