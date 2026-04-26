import './Teams.scss'
import Input from "../../shared/input/Input.tsx";
import Card from "../../shared/card/Card.tsx";
import {type ReactElement, useEffect, useMemo, useState} from "react";
import type {Team} from "../../../types/teams.contract.ts";
import {getTeams} from "./teamsService.ts";
import Pagination from "../../shared/pagination/Pagination.tsx";
import {useNavigate} from "react-router-dom";

function Teams(): ReactElement {
    const [all, setAll] = useState<Team[]>([]);
    const [search, setSearch] = useState("");
    const [range, setRange] = useState<[number, number]>([0, 10]);


    useEffect((): void => {
        getTeams().then(setAll);
    }, [])

    const filtered = useMemo(() => {
        return all.filter((team: Team) => !search || team.name.toLowerCase().includes(search.toLowerCase()))
    }, [all, search])

    const view = useMemo(() => {
        return filtered.slice(range[0], range[1])
    }, [filtered, range])

    const navigate = useNavigate();

    const navigationToCalendar = (id: number | string): void => {
        navigate(`/calendar/teams/${id}`);
    };

    return (
        <>
            <section className="teams">
                <Input placeholder='Поиск' image='search.svg' value={search} onChange={setSearch}></Input>

                <div className="teams__content">
                    {view.map((team: Team) => (
                        <div key={team.id} onClick={() => navigationToCalendar(team.id)}>
                            <Card img={team.crest} name={team.name}/>
                        </div>
                    ))}
                </div>

                <Pagination count={filtered.length} perPage={10} onChange={setRange}></Pagination>
            </section>
        </>
    )
}


export default Teams;