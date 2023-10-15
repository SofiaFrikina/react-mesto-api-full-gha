import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const ref = React.useRef();

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateAvatar({
            avatar: ref.current.value
        });
    }

    React.useEffect(() => {
        ref.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <div className="popup__label">
                    <input ref={ref} type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_name" id="avatar-input" required />
                    <span className="popup__text-error avatar-error"></span>
                </div>
            } />
    )
}
export default EditAvatarPopup;