import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./app/layout/Layout.tsx";
import Leagues from "./app/leagues/Leagues.tsx";
import Teams from "./app/Teams/Teams.tsx";


function App() {

    return (
        <>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Navigate to="/leagues" replace />} />
                    <Route path="/Leagues" element={<Leagues />} />
                    <Route path="/Teams" element={<Teams/>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
