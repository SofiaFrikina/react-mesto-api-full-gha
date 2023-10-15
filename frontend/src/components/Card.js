import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__button ${isLiked && 'element_clicked'}`
    );
    function handleLikeClick() {
        onCardLike(card);
    }
    const handleClick = () => {
        onCardClick(card);
    }
    function handleDeleteClick() {
        onCardDelete(card)
    }
    return (
        <div className="element">
            <img className="element__image" src={card.link} alt={`${card.name}`} onClick={handleClick} />
            <div className="element__group">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__likes">
                    <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName} aria-label="Поставить лайк"></button>
                    <span className="element__count">{card.likes.length}</span>
                </div>
            </div>
            {isOwn && <button onClick={handleDeleteClick} type="button" className="element__button-close" aria-label="Удалить картинку" />}
        </div>
    )
}

export default Card;

