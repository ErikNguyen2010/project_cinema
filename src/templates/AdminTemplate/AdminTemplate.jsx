import React, {Fragment, useEffect, useState} from "react"
import { useSelector } from "react-redux"
import { NavLink, Redirect, Route } from "react-router-dom"
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    UserOutlined,
    WindowsFilled,
    FileAddFilled,
    FileFilled,
    UserAddOutlined,
    RobotOutlined,
    SubnodeOutlined,
  } from '@ant-design/icons';
import { ACCESSTOKEN, USER_LOGIN } from "../../util/setting";
import { history } from "../../App";
  const { Header, Content, Footer, Sider } = Layout;

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
export const  AdminTemplate = (props) =>{

    const {userLogin} = useSelector(rootReducer => rootReducer.userReducer)

    const [collapsed, setCollapsed] = useState(false);
      useEffect(() => {
        window.scrollTo(0, 0);
    });

    if(!localStorage.getItem(USER_LOGIN)){
        alert("Bạn không có quyền truy cập vào trang!")
        return <Redirect to="/"/>
    }
    if(userLogin.maLoaiNguoiDung != "QuanTri"){
    alert("Bạn không có quyền truy cập vào trang!")
    return <Redirect to="/"/>
    }


    let Component = props.component



    return <Route exact path={props.path} render={(propsRoute) =>{
        return <Fragment>
     
            <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo p-3">
            <NavLink to="/">
              <img src="https://e-magazine.asiamedia.vn/wp-content/uploads/2022/01/512x512.22cdafa36d7ed05664bdb0a0699771c2.ai_.1.png" alt="..." style={{width:"100%", height:"140px"}}/>
            </NavLink>
        </div>
        <Menu theme="dark" mode="inline">


          <Menu.SubMenu key={23} title="Users" icon={<RobotOutlined />}>
            <Menu.Item key="12" icon={<UserOutlined/>}>
                <NavLink to="/admin/users">Users</NavLink>
            </Menu.Item>
            <Menu.Item key="13" icon={<SubnodeOutlined />}>
                <NavLink to="/admin/users/adduser">Add Users</NavLink>
            </Menu.Item>
          </Menu.SubMenu>


            <Menu.SubMenu key={22} title="Films" icon={<WindowsFilled />}>
              <Menu.Item key="41" icon={<FileFilled />}>
                  <NavLink to="/admin/films">Films</NavLink>
              </Menu.Item>
              <Menu.Item key="42" icon={<FileAddFilled />}>
                  <NavLink to="/admin/films/addnew">Add New</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
        </Menu>
      </Sider>
            <Layout className="site-layout">
                <Header      className="d-flex justify-content-end site-layout-background"
                style={{
                  padding: 0,
                }}>

                <Fragment>
                          <NavLink className="booking__avatar" style={{textTransform: "uppercase"}} to={`/profile/${userLogin.taiKhoan}`}>
                              <i className="fa-solid fa-user-astronaut"></i>
                                hi {userLogin.hoTen}
                              </NavLink>
                              <NavLink className="booking__avatar mr-5" onClick={() =>{
                                  if(window.confirm("Bạn có muốn đăng xuất không?")){
                                    localStorage.removeItem(USER_LOGIN)
                                    localStorage.removeItem(ACCESSTOKEN)
                                    history.push('/home')
                                    window.location.reload()
                                  }
                                }} to="#">
                                  Đăng Xuất
                              </NavLink>
                              <NavLink className="booking__avatar mr-5"  to="/">
                              <i className="fa-solid fa-house"></i> Về trang chủ
                              </NavLink>
                  </Fragment> 
                
                </Header>
                <Content
                style={{
                    margin: '0 16px',
                }}
                >
                     <Breadcrumb
                        style={{
                        margin: '16px 0',
                        }}
                    >
                        {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div
                        className="site-layout-background"
                        style={{
                        padding: 24,
                        minHeight: 360,
                        }}
                    >
                        <Component {...propsRoute}/>
                    </div>
                </Content>
                <Footer
                style={{
                    textAlign: 'center',
                }}
                >
                </Footer>
            </Layout>
            </Layout>
        </Fragment>
    }}/>
}




