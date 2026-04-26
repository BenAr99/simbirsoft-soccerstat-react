import './Card.scss'
import type {ReactElement} from "react";

interface Card {
    img: string;
    description?: string;
    name: string;
}

function Card(props: Card): ReactElement {
    return (
        <>
            <div className="card">
                <img alt="Эмблема" src={props.img}/>
                <p className="card__location">{props.description}</p>
                <p className="card__title">{props.name}</p>
            </div>
        </>
    )
}

export default Card;