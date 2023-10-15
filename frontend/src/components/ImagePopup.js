import React from 'react';
function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image ${card && 'popup_opened'}`}>
            <div className="popup__element">
                <img className="popup__image" src={card && card.link} alt={card && card.name} />
                <p className="popup__text">{card && card.name}</p>
                <button onClick={onClose} type="button" className="popup__close" aria-label="Закрыть"></button>
            </div>
        </div>
    )
}
export default ImagePopup;