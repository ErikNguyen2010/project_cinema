import React, { Fragment, memo, useEffect } from 'react'
import { Table,Space, Input  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { getDanhSachNguoiDungAPI, xoaNguoiDung } from '../../../redux/reducers/userReducer';
const { Search } = Input;


 function Users(props) {
  const {danhSachNguoiDung} = useSelector(rootReducer => rootReducer.userReducer)
  const dispatch = useDispatch()
  useEffect(() =>{
    const action = getDanhSachNguoiDungAPI()
    dispatch(action)
  },[])
  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
     
      width: "calc(100% / 7)",

    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      sorter: (a, b) => {
        let tenPhimA  = a.tenPhim.toLowerCase().trim()
        let tenPhimB = b.tenPhim.toLowerCase().trim()
        if(tenPhimA > tenPhimB){
          return 1
        }
        return -1
      },
      sortDirections: ['descend','ascend' ],
      width: "calc(100% / 7)",

    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      
      width: "calc(100% / 7)",
    },
    {
      title: 'Email',
      dataIndex: 'email',
      
      width: "calc(100% / 7)",
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
    
      width: "calc(100% / 7)",
    },
    {
      title: 'Loại Ngưởi Dùng',
      dataIndex: 'maLoaiNguoiDung',
    
      width: "calc(100% / 7)",
    },
    {
      title: 'Hành Động',
      dataIndex: 'taiKhoan',
      render: (text,user) =>{
        return <Fragment>
          <NavLink style={{fontSize: "20px", fontWeight:"bold"}} to={`/admin/users/edit/${user.taiKhoan}`}>
            <i className="fa-solid fa-marker"></i>
          </NavLink>
          <a onClick={() =>{
            const action = xoaNguoiDung(user.taiKhoan)
            dispatch(action)
          }} className="ml-4 mr-4" style={{fontSize: "20px", fontWeight:"bold", color:"red"}} >
            <i className="fa-solid fa-trash"></i>
          </a>
        </Fragment>
      },
      width: "calc(100% / 7)",
    },
  ];
  const data = danhSachNguoiDung;
  const onSearch = (value) => {
    const action = getDanhSachNguoiDungAPI(value)
    dispatch(action)
  }
  const onChange = (pagination, filters, sorter, extra) => {
  };
  return (
    <section className='users'>
      <h1 className='text-center mb-5' style={{fontSize: "30px", fontWeight:"bold", color:"black"}}>Quản Lý Người Dùng</h1>
      <button onClick={() =>{
        history.push("/admin/users/adduser")
      }} className="btn-add btn btn-success">Thêm Người Dùng</button>
      <Search
      className='my-3'
      placeholder="Tìm kiếm người dùng"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
        <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"taiKhoan"} />
    </section>
  )
}

export default memo(Users) 