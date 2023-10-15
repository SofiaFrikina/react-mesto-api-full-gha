
import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(email, password)
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
                <h1 className="authorization__title">Регистрация</h1>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <div className="authorization__label">
                        <input value={email} onChange={handleEmailChange} type="email" placeholder="Email" className="authorization__input authorization__input_type_email" id="email-input" minLength="2" maxLength="40" required />
                        <span className="authorization__text-error email-input-error"></span>
                    </div>
                    <div className="authorization__label">
                        <input value={password} onChange={handlePasswordChange} type="password" placeholder="Пароль" className="authorization__input authorization__input_type_password" id="password-input" minLength="2" maxLength="200" required />
                        <span className="authorization__text-error password-input-error"></span>
                    </div>
                    <button type="submit" className="authorization__button">Зарегистрироваться</button>
                </form>
                <Link to="/sign-in" className="authorization__login">Уже зарегистрированы? Войти</Link>
            </section>
        </main>
    )
}

export default Register;