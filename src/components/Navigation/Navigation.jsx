import { NavLink } from "react-router-dom";
import css from "../Navigation/Navigation.module.css"
import clsx from "clsx";

export default function Navigation() {

    const buildLinkClassforNav = ({ isActive }) => {
        return clsx(css.link, isActive && css.active);
      };

      
    return(
        <div className={css.navDiv}>
            <NavLink to="/" className={buildLinkClassforNav}>Home</NavLink>
            <NavLink to="/movies" className={buildLinkClassforNav}>Movies</NavLink>
        </div>
    )
}