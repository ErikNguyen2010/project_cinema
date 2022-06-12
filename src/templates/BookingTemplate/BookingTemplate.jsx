import React, {Fragment, useEffect} from "react"
import { useSelector } from "react-redux"
import { Route } from "react-router-dom"


export const  BookingTemplate = (props) =>{
      useEffect(() => {
        window.scrollTo(0, 0);
      });
    let Component = props.component

    return <Route exact path={props.path} render={(propsRoute) =>{
        return <Fragment>
            <Component {...propsRoute}/>
        </Fragment>
    }}/>
}

