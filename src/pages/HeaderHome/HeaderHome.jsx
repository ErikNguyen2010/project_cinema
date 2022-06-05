import React, { Fragment } from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import _ from "lodash"
import { useSelector } from 'react-redux';
import { ACCESSTOKEN, USER_LOGIN } from '../../util/setting';
import { history } from '../../App';



export default function HeaderHome(props) {
  const {userLogin} = useSelector(rootReducer => rootReducer.userReducer)
  const renderLogin = () =>{
    if(_.isEmpty(userLogin)){
      return  <Fragment>
        <NavLink to="/login">
            <i className="fa fa-user-circle"></i>
              Đăng Nhập
            </NavLink>
            <NavLink to="/register">
            <i className="fa fa-user-circle"></i>
              Đăng Ký
            </NavLink>
      </Fragment> 
    }
    return <Fragment>
    <NavLink style={{textTransform: "uppercase"}} to="/">
        <i className="fa-solid fa-user-astronaut"></i>
          hi {userLogin.hoTen}
        </NavLink>
        <NavLink onClick={() =>{
          if(window.confirm("Bạn có muốn đăng xuất không?")){
            localStorage.removeItem(USER_LOGIN)
            localStorage.removeItem(ACCESSTOKEN)
            history.push('/home')
            window.location.reload()
          }
        }} to="/">
          Đăng Xuất
        </NavLink>
  </Fragment> 
  }
  return (
    <header className='header'>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="content">
                <div className='header__logo'>
                  <NavLink to="/">
                    <img src="../image/cgv-logo.jpg" alt="..." />
                  </NavLink>
                </div>
              </div>    
            </div>
            <div className="col-4">
              <div className="content">
                <nav className="navbar">
                  <a href="#selectFilm">Lịch Chiếu</a>
                  <a href="#booking">Cụm Rạp</a>
                  <a href="#app">Ứng Dụng</a>
                  <a href="#footer">Tin Tức</a>
                </nav>
              </div>
            </div>
            <div className="col-4" style={{textAlign:"center"}}>
              <div className="content">
                <div className="header__login">
                    {renderLogin()}
                </div>
              </div>
            </div>
          </div>
        </div>
    </header>
  )
}
