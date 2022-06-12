import React, { Fragment, memo } from 'react'
import BookingTicket from '../../components/BookingTicket/BookingTicket';
import HistoryBooking from '../../components/HistoryBooking/HistoryBooking';
import { useDispatch, useSelector } from 'react-redux';
import { chuyenTabActive } from '../../redux/reducers/bookingReducer';
import { Tabs, Button, Divider, Checkbox } from 'antd'
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import { ACCESSTOKEN, USER_LOGIN } from '../../util/setting';
import { HomeFilled } from '@ant-design/icons';

const { TabPane } = Tabs;
function BookingPage(props) {
  const {userLogin} = useSelector(rootReducer =>rootReducer.userReducer)
  const {tab} = useSelector(rootReducer => rootReducer.bookingReducer)
  
  const dispatch = useDispatch()

  return (
    <div>
        <Tabs tabBarExtraContent={
          <Fragment >
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
      
      } defaultActiveKey="1" activeKey={tab} onChange={(key) =>{
          const action = chuyenTabActive(key)
          dispatch(action)
        }}>
            <TabPane className='m-0'  tab={<h1 className='ml-1 p-2' style={{fontSize: "20px", fontWeight:"bold"}}>
              1. ĐẶT VÉ VÀ THANH TOÁN
            </h1>} key="1">
                <BookingTicket {...props}/>
            </TabPane>
            <TabPane className='m-0'  tab={<h1 className='ml-1 p-2' style={{fontSize: "20px", fontWeight:"bold"}}>
              2. LỊCH SỬ ĐẶT VÉ
            </h1>} key="2">
                <HistoryBooking {...props}/>
            </TabPane>
        </Tabs>
    </div>
  )
}


export default memo(BookingPage)
