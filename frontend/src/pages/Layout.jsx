import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Loading } from "../components/Loading";

export const Layout = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
    }, [])

    return (
        <>
            <Navbar/>
            <div className="container justify-content-md-center pt-3">
                {!loading ? <Loading/> : <Outlet/>}
            </div>
            {/* <footer className="fixed-bottom">To</footer> */}
        </>
    )
}