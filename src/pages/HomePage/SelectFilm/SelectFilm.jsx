import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFilms, getFilmsDangChieu, getFilmsSapChieu, getListFilmApi } from '../../../redux/reducers/layDanhSachFilmReducer'
import { Button, Modal } from 'antd';
import { NavLink } from 'react-router-dom';

 function SelectFilm(props) {






    const dispatch = useDispatch()
    useEffect(() =>{
        const action = getFilms()
        dispatch(action)
    },[])
    const renderFilmsSapChieu = () =>{
        const action = getFilmsSapChieu()
        dispatch(action)
    }
    const renderFilmsDangChieu = () =>{
        dispatch(getFilmsDangChieu())
    }
    const renderFilms = () => {
        return props.films.slice(0,12).map((film,key) =>{
            return  <div key={key} className="col-3">
            <div className="content">
                <div className="film__detail">
                    <div className="film__img">
                        <div className='film__imgbg' style={{backgroundImage: `url(${film.hinhAnh})`}}></div>
                        <div className="film__overlay">
                            <NavLink to={`/detail/${film.maPhim}`} className="btn-buy btn btn-danger">MUA VÉ</NavLink>
                            <a target="_blank" href={film.trailer} className=" btn-trailer btn btn-primary">XEM TRAILER</a>

                        </div>
                    </div>
                    <div className="film__name">
                        <span className="badge badge-danger">C18</span>
                        <h1 className='mt-2 film__title'>{film.tenPhim}</h1>
                    </div>
                </div>
            </div>
        </div>
        })
    }
  return (
    <section id='selectFilm' className='selectfilm'>
        
        <div className="container">
                <button onClick={renderFilmsDangChieu} className={`btn-film mr-3 btn btn-success`}>Phim đang chiếu</button>
                <button onClick={renderFilmsSapChieu} className={` btn-film  btn btn-primary`}>Phim sắp chiếu</button>
            <div className="row">
                {renderFilms()}



               
            </div>
        </div>

    </section>
  )
}

export default memo(SelectFilm)

