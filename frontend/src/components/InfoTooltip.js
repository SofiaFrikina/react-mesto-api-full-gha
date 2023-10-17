
import React from 'react';
import unionIcon from '../images/Union.svg';
import closeIcon from '../images/CloseIcon.svg'

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_modal ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__infotooltip">
                <img className="popup__register-image" src={props.status ? unionIcon : closeIcon} />
                <p className="popup__answer">{props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
                <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть"></button>
            </div>
        </div>
    )
}

export default InfoTooltip;