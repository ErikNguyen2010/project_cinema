import React from 'react'

export default function App() {
  return (
    <section id='app' className='app'>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="content">
                        <div className="app__detail">
                            <h1>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h1>
                            <span>Không chỉ đặt vé, bạn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn</span>
                            <br/>
                            <button className="btn btn-danger">APP MIỄN PHÍ - TẢI VỀ NGAY!</button>
                            <br/>
                            <span>TIX có hai phiên bản <a target="_blank" href="https://www.apple.com/vn/app-store/">
                                IOS
                                </a> & 
                                <a target="_blank" href="https://play.google.com/store/games?hl=vi&gl=US">
                                Android
                                </a>
                                </span>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="content">
                        <div className='app__img'> 
                            <img src="./image/phone.png" alt="..." />
                            <div className='app__img--second'>
                                <img src="./image/film2.jpg" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
