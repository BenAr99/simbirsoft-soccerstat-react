import './Leagues.scss'
import {useEffect, useMemo, useState} from "react";
import {getLeagues} from "./LeaguesService.ts";
import type {League} from "../../types/leagues.contract.ts";
import Card from "../shared/card/Card.tsx";
import Input from "../shared/input/Input.tsx";
import Pagination from "../shared/pagination/Pagination.tsx";

function Leagues() {
    const [all, setAll] = useState<League[]>([]);
    const [search, setSearch] = useState("");
    const [range, setRange] = useState<[number, number]>([0, 10]);

    useEffect(() => {
        getLeagues().then(setAll);
    }, []);

    const filtered = useMemo(() => {
        return all.filter(
            (league) =>
                !search ||
                league.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [all, search]);

    const view = useMemo(() => {
        return filtered.slice(range[0], range[1]);
    }, [filtered, range]);

    return (
        <>
            <section className="leagues">
                <Input placeholder="Поиск" image='search.svg' value={search} onChange={setSearch} />

                <div className="leagues__content">
                    {view.map((league) => (
                        <Card
                            key={league.id}
                            img={league.emblem}
                            name={league.name}
                        />
                    ))}
                </div>

                <Pagination
                    count={filtered.length}
                    perPage={10}
                    onChange={setRange}
                />
            </section>
        </>
    );
}

export default Leagues;