import './Leagues.scss'
import searchIcon from '/src/assets/icons/search.svg'
import {type ReactElement, useEffect, useMemo, useState} from "react";
import {getLeagues} from "./leaguesService.ts";
import type {League} from "../../../types/leagues.contract.ts";
import Card from "../../shared/card/Card.tsx";
import Input from "../../shared/input/Input.tsx";
import Pagination from "../../shared/pagination/Pagination.tsx";
import {useNavigate} from "react-router-dom";
import {useError} from "../../shared/context/error.tsx";


function Leagues(): ReactElement {
    const { setError } = useError();
    const [all, setAll] = useState<League[]>([]);
    const [search, setSearch] = useState("");
    const [range, setRange] = useState<[number, number]>([0, 10]);

    useEffect((): void => {
        getLeagues().then(setAll).catch((e) => setError(e.message));
    }, [setError]);

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

    const navigate = useNavigate();

    const navigationToCalendar = (id: number | string): void => {
        navigate(`/calendar/leagues/${id}`);
    };

    return (
        <>
            <section className="leagues">
                <Input placeholder="Поиск" image={searchIcon} value={search} onChange={setSearch}/>

                <div className="leagues__content">
                    {view.map((league) => (
                        <div key={league.id} onClick={() => navigationToCalendar(league.id)}>
                            <Card
                                key={league.id}
                                img={league.emblem}
                                name={league.name}
                            />
                        </div>
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