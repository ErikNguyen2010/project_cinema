import React, { Fragment, useEffect } from 'react'
import { Table,Space, Input  } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms, xoaPhimAPI } from '../../../redux/reducers/layDanhSachFilmReducer';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { memo } from 'react';
const { Search } = Input;


 function Films() {
  const {arrFilmDefault} = useSelector(rootReducer => rootReducer.layDanhSachFilmReducer)
  const dispatch = useDispatch()
  useEffect(() =>{
    const action = getFilms()
    dispatch(action)
  },[])
  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend','ascend' ],
      width: "10%",
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render : (text,film,index) =>{
        return <Fragment key={text}>
          <img onError={(e) =>{
            e.target.onError = null;
            e.target.src =`https://picsum.photos/${index}/50`
          }} style={{width:"100px", height:"150px"}} src={film.hinhAnh} alt="..." />
        </Fragment>
      },
      width: "20%",

    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      sorter: (a, b) => {
        let tenPhimA  = a.tenPhim.toLowerCase().trim()
        let tenPhimB = b.tenPhim.toLowerCase().trim()
        if(tenPhimA > tenPhimB){
          return 1
        }
        return -1
      },
      sortDirections: ['descend','ascend' ],
      width: "20%",

    },
    {
      title: 'Mô Tả',
      dataIndex: 'moTa',
      render:(text,film) =>{
        return <Fragment>
          {film.moTa.length > 50 ? film.moTa.substr(0,200) + "..." : film.moTa}
        </Fragment>
      },
      width: "30%",
    },
    {
      title: 'Hành Động',
      dataIndex: 'maPhim',
      render: (text,film) =>{
        return <Fragment>
          <NavLink style={{fontSize: "20px", fontWeight:"bold"}} to={`/admin/films/edit/${film.maPhim}`}>
            <i className="fa-solid fa-marker"></i>
          </NavLink>
          <a onClick={() =>{
            const action = xoaPhimAPI(film.maPhim)
            dispatch(action)
          }} className="ml-4 mr-4" style={{fontSize: "20px", fontWeight:"bold", color:"red"}} >
            <i className="fa-solid fa-trash"></i>
          </a>
          <NavLink style={{color: "green" ,fontSize: "20px", fontWeight:"bold"}} to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}>
            <i className="fa-solid fa-calendar-days"></i>
          </NavLink>
        </Fragment>
      },
      width: "30%",
    },
  ];
  const data = arrFilmDefault;
  
  const onSearch = (value) => {
    const action = getFilms(value)
    dispatch(action)
  }
  const onChange = (pagination, filters, sorter, extra) => {
  };
  return (
    <section className='admin__films'>
      <h1 className='text-center mb-5' style={{fontSize: "30px", fontWeight:"bold", color:"black"}}>Quản Lý Films</h1>
      <button onClick={() =>{
        history.push("/admin/films/addnew")
      }} className="btn-add btn btn-success">Thêm Films</button>
      <Search
      className='my-3'
      placeholder="Tìm kiếm film"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
        <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
    </section>
  )
}

export default memo(Films)