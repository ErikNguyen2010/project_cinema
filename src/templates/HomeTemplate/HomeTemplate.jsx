import React, {Fragment, useEffect} from "react"
import { useSelector } from "react-redux"
import { Route } from "react-router-dom"
import FooterHome from "../../pages/FooterHome/FooterHome"
import HeaderHome from "../../pages/HeaderHome/HeaderHome"


export const  HomeTemplate = (props) =>{
      useEffect(() => {
        window.scrollTo(0, 0);
      });
    let Component = props.component

    return <Route exact path={props.path} render={(propsRoute) =>{
        return <Fragment>
            <HeaderHome/>
            <Component {...propsRoute}/>
            <FooterHome/>
        </Fragment>
    }}/>
}

