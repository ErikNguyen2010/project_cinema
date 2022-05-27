import React from 'react'

export default function FooterHome(props) {
  return (
    <footer className='footer'>
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div className="content">
                        <h1>
                            Tix
                        </h1>
                        <div className="footer__detail">
                            <a href=''>FAQ</a>
                            <a href=''>Thỏa thuận sử dụng</a>
                            <a href=''>Brand Guidelines</a>
                            <a href=''>Chính sách bảo mật</a>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="content">
                        <h1>
                            Đối tác
                        </h1>
                        <div className="footer__brands">
                            <img src="./image/brand-1.png" alt="..." />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="content">
                        <h1>
                            Mobile Apps
                        </h1>
                        <div className="footer__apps">
                           <a href="">
                                <i className="fa fa-apple"></i>
                                
                           </a>
                           <a href="">
                                <i className="fa fa-android"></i>
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
                            <a href="">
                                <i className="fa fa-facebook"></i>
                           </a>
                           <a href="">
                                <i className="fa fa-instagram"></i>
                           </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="content">
                        <div className="footer__img">
                            <img src="./image/cgv-logo.jpg" alt="..." />
                        </div>
                        <div className='footer__content'>
                            <p>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</p>
                            <span>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</span>
                            <span>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</span>
                            <span>Đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</span>
                            <span>Số Điện Thoại (Hotline): 1900 545 436</span>
                        </div>
                        <div className="footer__img">
                            <img src="./image/bocongthuong.jpg" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
