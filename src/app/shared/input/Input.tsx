import './Input.scss'
import type {ReactElement} from "react";

interface InputProps {
    value: string;
    placeholder?: string;
    image?: string;
    onChange: (value: string) => void;
}

function Input(props: InputProps): ReactElement {
    return (
        <>
            <div className="input__container">
                {props.image && (
                    <img alt="Иконка поля" src={props.image}/>
                )}
                <input placeholder={props.placeholder} value={props.value}
                       onChange={(e) => props.onChange(e.target.value)}/>
            </div>
        </>
    )
}

export default Input;