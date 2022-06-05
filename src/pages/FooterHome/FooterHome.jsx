import React from 'react'
import { useSelector } from 'react-redux'

export default function FooterHome(props) {
    const {arrRap} = useSelector((rootReducer) => rootReducer.rapReducer)
  return (
    <footer id='footer' className='footer'>
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div className="content">
                        <h1>
                            Tix
                        </h1>
                        <div className="footer__detail">
                            <a href='#'>FAQ</a>
                            <a href='#'>Thỏa thuận sử dụng</a>
                            <a href='#'>Brand Guidelines</a>
                            <a href='#'>Chính sách bảo mật</a>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="content">
                        <h1>
                            Đối tác
                        </h1>
                        <div className="footer__brands d-flex">
                            {arrRap?.map((rap,key) =>{
                            return <img key={key} src={rap.logo} alt="..." style={{marginRight: "3px", width: "40px"}} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="content">
                        <h1>
                            Mobile Apps
                        </h1>
                        <div className="footer__apps">
                           <a href="https://www.apple.com/vn/app-store/" target="_blank">
                                <i className="fa-brands fa-apple"></i>
                                
                           </a>
                           <a href="https://play.google.com/store/games?hl=vi&gl=US" target="_blank">
                                <i className="fa-brands fa-android"></i>
                           </a>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="content">
                        <h1>
                            Social Apps
                        </h1>
                        <div className="footer__apps">
                            <a href="https://www.facebook.com/" target="_blank">
                                <i className="fa-brands fa-facebook"></i>
                           </a>
                           <a href="https://www.instagram.com/" target="_blank">
                                <i className="fa-brands fa-instagram"></i>
                           </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="content">
                        <div className="footer__img">
                            <img src="../image/cgv-logo.jpg" alt="..." />
                        </div>
                        <div className='footer__content'>
                            <p>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</p>
                            <span>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</span>
                            <span>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</span>
                            <span>Đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</span>
                            <span>Số Điện Thoại (Hotline): 1900 545 436</span>
                        </div>
                        <div className="footer__img">
                            <img src="../image/bocongthuong.jpg" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
