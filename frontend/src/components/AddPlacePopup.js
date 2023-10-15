import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [title, setTitle] = React.useState('');
    const [job, setJob] = React.useState('');

    React.useEffect(() => {
        if (isOpen) {
            setTitle('');
            setJob('');
        }

    }, [isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: title,
            link: job
        });
    }

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function handleJobChange(event) {
        setJob(event.target.value)
    }

    return (
        <PopupWithForm
            name='new-element'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <div className="popup__label">
                        <input value={title} onChange={handleTitleChange} type="text" placeholder="Название" className="popup__input popup__input_type_text" name="name"
                            id="text-input" minLength="2" maxLength="30" required />
                        <span className="popup__text-error text-input-error"></span>
                    </div>
                    <div className="popup__label">
                        <input value={job} onChange={handleJobChange} type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_sourse"
                            name="link" id="url-input" required />
                        <span className="popup__text-error url-input-error"></span>
                    </div>
                </>
            } />
    )
}

export default AddPlacePopup;