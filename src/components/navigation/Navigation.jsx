import React from 'react'
import css from './Navigation.module.css'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
 const Navigation = () => {
  return (
    <header >
    <nav className={css.nav}>
       
            <NavLink className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/">Home</NavLink>
            <NavLink className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/Movies">Movies</NavLink>
            
        
    </nav>
    <hr />
    </header>
  )
}
export default Navigation