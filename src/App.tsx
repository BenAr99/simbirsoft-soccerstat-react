import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./app/layout/Layout.tsx";
import Leagues from "./app/pages/leagues/Leagues.tsx";
import Teams from "./app/pages/teams/Teams.tsx";
import Calendar from "./app/pages/calendar/Calendar.tsx";
import {getMatchesTeam} from "./app/pages/teams/teamsService.ts";
import {getMatchesLeague} from "./app/pages/leagues/leaguesService.ts";

function App() {

    return (
        <>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Navigate to="/leagues" replace/>}/>
                    <Route path="/Leagues" element={<Leagues/>}/>
                    <Route path="/Teams" element={<Teams/>}/>
                    <Route
                        path="/calendar/leagues/:id"
                        element={
                            <Calendar service={getMatchesLeague}/>
                        }
                    />
                    <Route
                        path="/calendar/teams/:id"
                        element={
                            <Calendar service={getMatchesTeam}/>
                        }
                    />
                    </Route>
            </Routes>
        </>
    )
}

export default App
