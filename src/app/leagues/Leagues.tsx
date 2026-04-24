import './Leagues.scss'
import Input from "../shared/input/Input.tsx";
import {useEffect, useState} from "react";
import {getLeagues} from "./LeaguesService.ts";
import Card from "../shared/card/Card.tsx";
import type {League} from "../../types/leagues.contract.ts";


function Leagues() {
    const [text, setText] = useState("");
    const [leagues, setLeagues] = useState<League[]>([]);

    useEffect(()=> {
        getLeagues().then((data: League[])=> {
            setLeagues(data);
        })
    }, [])

    return (
        <>
            <section className="leagues">
                <Input value={text} onChange={setText}></Input>

                <div className="leagues__content">
                    {leagues.map((league: League) => (
                        <Card img={league.emblem} name={league.name} description={league.area.name}></Card>
                    ))}
                </div>
            </section>
        </>
)
}

export default Leagues