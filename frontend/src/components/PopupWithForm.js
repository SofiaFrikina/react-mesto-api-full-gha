import React from 'react';

function PopupWithForm(props) {
    return (
        <>
            <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
                <div className="popup__container">
                    <h2 className="popup__title">{props.title}</h2>
                    <form onSubmit={props.onSubmit} name={`${props.name}-form`} className="popup__form">
                        {props.children}
                        <button type="submit" className="popup__button">Сохранить</button>
                    </form>
                    <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть"></button>
                </div>
            </div>

        </>
    )
}
export default PopupWithForm;