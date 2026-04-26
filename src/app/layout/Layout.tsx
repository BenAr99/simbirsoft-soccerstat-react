import Header from "../shared/header/Header.tsx";
import {Outlet} from "react-router-dom";
import type {ReactElement} from "react";
import {useError} from "../shared/context/error.tsx";
import './Layout.scss'

function Layout(): ReactElement {
    const { error, setError } = useError();

    return (
        <>
            <Header/>
            {error && (
                <div className="error_container">
                    {error}
                    <button onClick={() => setError(null)}>✕</button>
                </div>
            )}
            <Outlet/>
        </>
    )
}

export default Layout;