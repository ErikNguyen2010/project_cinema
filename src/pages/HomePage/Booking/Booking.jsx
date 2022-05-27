import React from "react";
import { Radio, Space, Tabs } from 'antd';
import { useState,useEffect  } from 'react';
import { useDispatch } from "react-redux";
import { getThongTinRap } from "../../../redux/reducers/layThongTinRapReducer";
import { render } from "react-dom";
const { TabPane } = Tabs;


export default function Booking(props) {
    const [tabPosition, setTabPosition] = useState('left');
    const dispatch = useDispatch()
    useEffect(() =>{
      const action = getThongTinRap()
      dispatch(action)
    },[])
    console.log(props.arrRap);
    const renderRap = () =>{
      return props.arrRap.map((rap, key) =>{
        return <TabPane tab={<img src={`${rap.logo}`} style={{width: "50px", borderRadius:"50%", height: '50px'}}></img>}  key={key}>
              </TabPane>
     

        
      })
    }
  return (
    <section className="booking">
        <div className="container">
            <Tabs tabPosition={tabPosition}>
                {renderRap()}
            </Tabs>
        </div>
    </section>
  );
}
