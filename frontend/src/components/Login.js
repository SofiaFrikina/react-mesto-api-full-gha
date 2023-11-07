
import React from 'react';
import { useNavigate } from "react-router-dom";
import { authorize } from '../utils/auth';
import api from '../utils/api'


function Login({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    function handleSubmit(evt) {
        evt.preventDefault();
        authorize(email, password)
            .then(res => {
                const token = res.token;
                if (token) {
                    localStorage.setItem('token', token);
                    api.setToken(token);
                }
                onLogin();
                navigate("/");
            })

    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value)
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value)
    }
    return (
        <main className="content">
            <section className="authorization">
                <h1 className="authorization__title">Вход</h1>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <div className="popup__label">
                        <input value={email} onChange={handleEmailChange} type="email" placeholder="Email" className="authorization__input authorization__input_type_email" id="email-input" minLength="2" maxLength="40" required />
                        <span className="authorization__text-error email-input-error"></span>
                    </div>
                    <div className="popup__label">
                        <input value={password} onChange={handlePasswordChange} type="password" placeholder="Пароль" className="authorization__input authorization__input_type_password" id="password-input" minLength="2" maxLength="200" required />
                        <span className="authorization__text-error password-input-error"></span>
                    </div>
                    <button type="submit" className="authorization__button">Войти</button>
                </form>
            </section>
        </main>
    )
}

export default Login;