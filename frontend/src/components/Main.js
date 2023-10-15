import React from 'react';

import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} className="profile__avatar"
                        alt="Фотография пользователя" />
                    <button type="button" className="profile__avatar-button" aria-label="Редактировать аватар"></button>
                </div>

                <div className="profile__info">
                    <div className="profile__name">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Редактировать профиль"></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить фотографии"></button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card onCardClick={onCardClick} card={card} key={card._id} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                ))}
            </section>


        </main>
    )
}


export default Main