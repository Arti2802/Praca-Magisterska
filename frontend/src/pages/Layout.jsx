import React from "react";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return(
        <>
            <Navbar/>
            <div className="container justify-content-md-center pt-3">
                <Outlet/>
            </div>
        </>
    )
}