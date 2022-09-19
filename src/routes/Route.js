import { Redirect, Route } from "react-router";
import React from 'react'

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){

    const loading = false;
    const signed = false;

    if(loading) {
        return(
            <div></div>
        )
    }

    if(!signed && isPrivate) {
        return <Redirect to="/" />
    }

    if(signed && !isPrivate) {
        return <Redirect to="/dashboard" />
    }

    return(
        <Route 
        {...rest}
        render={ props=> (
            <Component />
        )}
        />
    )
}

