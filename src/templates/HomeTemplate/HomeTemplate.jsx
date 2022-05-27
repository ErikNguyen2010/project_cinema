import React, {Fragment} from "react"
import { Route } from "react-router-dom"
import FooterHome from "../../pages/FooterHome/FooterHome"
import HeaderHome from "../../pages/HeaderHome/HeaderHome"


export const  HomeTemplate = (props) =>{
    let Component = props.component
    return <Route exact path={props.path} render={(propsRoute) =>{
        return <Fragment>
            <HeaderHome/>
            <Component/>
            <FooterHome/>
        </Fragment>
    }}/>
}

