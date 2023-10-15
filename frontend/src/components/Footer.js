import React from 'react';
function Footer() {

    return (
        <footer className="footer">
            <p className="footer__text">© <span className="year">{new Date().getFullYear()}</span> Mesto Russia</p>

        </footer>
    )
}
export default Footer;