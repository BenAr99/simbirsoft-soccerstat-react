import './Header.scss'
import {NavLink} from "react-router-dom";
import type {ReactElement} from "react";

function Header(): ReactElement {
    return (
        <section className="header__container">
            <header>
                <img alt="Лого" src="/images/fifaLogo.png"/>
                <nav>
                    <ul className="header__nav">
                        <li>
                            <NavLink to="/leagues" className={({isActive}) => isActive ? "active" : ""}>Лиги</NavLink>
                        </li>
                        <li>
                            <NavLink to="/teams" className={({isActive}) => isActive ? "active" : ""}>Команды</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </section>
    )
}

export default Header