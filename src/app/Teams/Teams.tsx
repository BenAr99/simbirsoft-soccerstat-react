import './Teams.scss'
import Input from "../shared/input/Input.tsx";
import Card from "../shared/card/Card.tsx";
import {useEffect, useMemo, useState} from "react";
import type {Team} from "../../types/teams.contract.ts";
import {getTeams} from "./TeamsService.ts";
import Pagination from "../shared/pagination/Pagination.tsx";

function Teams() {
    const [all, setAll] = useState<Team[]>([]);
    const [search, setSearch] = useState("");
    const [range, setRange] = useState<[number, number]>([0, 10]);


    useEffect(() => {
        getTeams().then(setAll);
    }, [])

    const filtered = useMemo(()=> {
        return all.filter((team: Team) => !search || team.name.toLowerCase().includes(search.toLowerCase()))
    }, [all, search])

    const view = useMemo(() => {
        return filtered.slice(range[0], range[1])
    }, [filtered, range])

    return (
        <>
            <section className="teams">
                <Input placeholder='Поиск' image='search.svg' value={search} onChange={setSearch}></Input>

                <div className="teams__content">
                    {view.map((league: Team) => (
                        <Card img={league.crest} name={league.name}></Card>
                    ))}
                </div>

                <Pagination count={filtered.length} perPage={10} onChange={setRange}></Pagination>
            </section>
        </>
    )
}


export default Teams;