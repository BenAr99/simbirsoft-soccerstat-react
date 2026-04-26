import "./Calendar.scss";
import {type ReactElement, useEffect, useMemo, useState} from "react";
import {Link, useParams} from "react-router-dom";

import DatePicker from "../../shared/date-picker/Date-picker.tsx";
import Pagination from "../../shared/pagination/Pagination.tsx";

import type {Match, MatchCalendar} from "./calendar.contract.ts";

type Range = [number, number];

type Props = {
    service: (
        id: string,
        startDate: Date | null,
        endDate: Date | null
    ) => Promise<MatchCalendar>;
};

function Calendar({service}: Props): ReactElement {
    const {id} = useParams();

    const [all, setAll] = useState<Match[]>([]);
    const [name, setName] = useState<string>("");

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [range, setRange] = useState<Range>([0, 10]);

    const type = "Calendar";
    const path = "/calendar";

    useEffect(() => {
        if (!id) return;

        if ((startDate && !endDate) || (!startDate && endDate)) return;

        const parsedStart = startDate ? new Date(startDate) : null;
        const parsedEnd = endDate ? new Date(endDate) : null;

        service(id, parsedStart, parsedEnd).then((res) => {
            setAll(res.matches);
            setName(res.name);
        });
    }, [id, startDate, endDate, service]);

    const view = useMemo(() => {
        return all.slice(range[0], range[1]);
    }, [all, range]);

    return (
        <section className="calendar">

            <div className="navigation">
                <Link to={path}>{type}</Link>
                {" / "}
                <span>{name}</span>
            </div>

            <div className="match__date">
                <div className="match__date-item">
                    <span>Матчи с</span>
                    <DatePicker value={startDate} onChange={setStartDate}/>
                </div>

                <div className="match__date-item">
                    <span>по</span>
                    <DatePicker value={endDate} onChange={setEndDate}/>
                </div>
            </div>

            <div className="match__container">
                {view.map((match, index) => (
                    <div className="match__content" key={index}>
                        <div className="match__description">
                            <span>
                                {new Date(match.date).toLocaleDateString("ru-RU")}
                            </span>

                            <span>
                                {new Date(match.date).toLocaleTimeString("ru-RU", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>

                            <span>{match.status}</span>

                            <span className="match__teams">
                                {match.home.name} - {match.away.name}
                            </span>
                        </div>

                        <div className="match__result">
                            {match.home.fullTimeScore !== undefined &&
                                match.away.fullTimeScore !== undefined && (
                                    <span>
                                        {match.home.fullTimeScore}:
                                        {match.away.fullTimeScore}
                                    </span>
                                )}

                            {match.home.halfTimeScore !== undefined &&
                                match.away.halfTimeScore !== undefined && (
                                    <span>
                                        ({match.home.halfTimeScore}:
                                        {match.away.halfTimeScore})
                                    </span>
                                )}

                            {match.home.penalties !== undefined &&
                                match.away.penalties !== undefined && (
                                    <span>
                                        ({match.home.penalties}:
                                        {match.away.penalties})
                                    </span>
                                )}
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                count={all.length}
                perPage={10}
                onChange={setRange}
            />
        </section>
    );
}

export default Calendar;