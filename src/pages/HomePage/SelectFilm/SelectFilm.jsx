import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFilms, getListFilmApi } from '../../../redux/reducers/layDanhSachFilmReducer'
import { Button, Modal } from 'antd';

export default function SelectFilm(props) {



    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
    setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };


 



    const dispatch = useDispatch()
    useEffect(() =>{
        const action = getFilms()
        dispatch(action)
    },[])
    const renderFilms = () => {
        return props.films.map((film,key) =>{
            return  <div key={key} className="col-3">
            <div className="content">
                <div className="film__detail">
                    <div className="film__img">
                        <div className='film__imgbg' style={{backgroundImage: `url(${film.hinhAnh})`}}></div>
                        <div className="film__overlay">
                            <button className="btn-buy btn btn-danger">MUA VÉ</button>
                            <Button  onClick={showModal} className="btn-trailer btn btn-primary">XEM TRAILER</Button>

                        </div>
                    </div>
                    <div className="film__name">
                        <span class="badge badge-danger">C18</span>
                        <h1 className='film__title'>{film.tenPhim}</h1>
                    </div>
                </div>
                <Modal width={1000} destroyOnClose={true} onCancel={handleCancel}  visible={isModalVisible}>
                   <iframe frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in- 
picture" allowFullScreen width={1100} height={700} src="https://www.youtube.com/embed/V5he1JXiQbg" />

                </Modal>
            </div>
        </div>
        })
    }
  return (
    <section className='selectfilm'>
        
        <div className="container">
            <div className="row">
                {renderFilms()}



               
            </div>
        </div>

    </section>
  )
}
