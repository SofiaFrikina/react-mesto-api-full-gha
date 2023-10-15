import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    React.useEffect(() => {
        if (isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }

    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <div className="popup__label">
                        <input value={name} onChange={handleNameChange} type="text" placeholder="Имя" className="popup__input popup__input_type_name" id="name-input" minLength="2" maxLength="40" required />
                        <span className="popup__text-error name-input-error"></span>
                    </div>
                    <div className="popup__label">
                        <input value={description} onChange={handleDescriptionChange} type="text" placeholder="Профессия" className="popup__input popup__input_type_job" id="job-input" minLength="2" maxLength="200" required />
                        <span className="popup__text-error job-input-error"></span>
                    </div>
                </>
            } />
    )

}
export default EditProfilePopup;