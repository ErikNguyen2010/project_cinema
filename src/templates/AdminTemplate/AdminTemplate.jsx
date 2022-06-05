import React, {Fragment, useEffect, useState} from "react"
import { useSelector } from "react-redux"
import { NavLink, Redirect, Route } from "react-router-dom"
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    WindowsFilled,
    FileAddFilled,
    FileFilled,
  } from '@ant-design/icons';
import { USER_LOGIN } from "../../util/setting";
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
              <img src="../image/bg-cgv.png" alt="..." style={{width:"100%", height:"140px"}}/>
            </NavLink>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined/>}>
                <NavLink to="/admin/users">Users</NavLink>
            </Menu.Item>


            <Menu.SubMenu key={22} title="Films" icon={<WindowsFilled />}>
              <Menu.Item key="41" icon={<FileFilled />}>
                  <NavLink to="/admin/films">Films</NavLink>
              </Menu.Item>
              <Menu.Item key="42" icon={<FileAddFilled />}>
                  <NavLink to="/admin/films/addnew">Add New</NavLink>
              </Menu.Item>
            </Menu.SubMenu>


            <Menu.Item key="3" icon={<DesktopOutlined/>}>
                <NavLink to="/admin/showtime">Showtime</NavLink>
            </Menu.Item>
        </Menu>
      </Sider>
            <Layout className="site-layout">
                <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
                />
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




