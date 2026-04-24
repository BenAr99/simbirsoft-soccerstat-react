import './Teams.scss'
import Input from "../shared/input/Input.tsx";
import Card from "../shared/card/Card.tsx";
import {useEffect, useState} from "react";
import type {Team} from "../../types/teams.contract.ts";
import {getTeams} from "./TeamsService.ts";

function Teams() {
    const [text, setText] = useState("");
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        getTeams().then((data: Team[]) => {
            setTeams(data)
        })
    }, [])

    return (
        <>
            <section className="teams">
                <Input value={text} onChange={setText}></Input>

                <div className="teams__content">
                    {teams.map((league: Team) => (
                        <Card img={league.crest} name={league.name}></Card>
                    ))}
                </div>
            </section>
        </>
    )
}


export default Teams;