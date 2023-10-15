import headerLogo from '../images/header__image.svg';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Header(props) {
    const [isActiveMenu, setIsActiveMenu] = React.useState(false)

    function openMenu() {
        setIsActiveMenu(!isActiveMenu)
    }
    return (
        <header className={isActiveMenu ? "header header_active" : "header"}>
            <img src={headerLogo} className="header__logo" alt="Логотип" />
            <Routes>
                <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
                <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
                <Route path="/" element={
                    <>
                        <div className={isActiveMenu ? "header__elements header__elements_active" : "header__elements"}>
                            <div className="header__email">{props.userEmail}</div>
                            <button onClick={props.onSignOut} className="header__exit">Выйти</button>
                        </div>
                        <button className={isActiveMenu ? "header__menu header__menu_active" : "header__menu"} onClick={openMenu}>
                            <span className="header__menu-line"></span>
                            <span className="header__menu-line"></span>
                            <span className="header__menu-line"></span>
                        </button>

                    </>} />
            </Routes>
        </header>
    )
}

export default Header;