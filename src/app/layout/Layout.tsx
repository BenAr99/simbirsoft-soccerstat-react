import Header from "../shared/header/Header.tsx";
import {Outlet} from "react-router-dom";
import type {ReactElement} from "react";

function Layout(): ReactElement {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default Layout;