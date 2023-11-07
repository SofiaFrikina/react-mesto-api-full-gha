import React from 'react';
import api from '../utils/api'
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { register, authorize, checkToken } from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [message, setMessage] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("")
  const navigate = useNavigate();


  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([resUser, resCard]) => {
          setCurrentUser(resUser);
          setCards(resCard);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setLoggedIn(true)
          setUserEmail(res.email)
          navigate('/', { replace: true })
        })
        .catch((err) => console.log(err))
    }
  }, [navigate]);

  function handleRegister(email, password) {
    register(email, password)
      .then((res) => {
        setInfoTooltipOpen(true)
        if (res) {
          setMessage(true);
          navigate('/sign-in', { replace: true })
        }
      })
      .catch(() => {
        setMessage(false);
        setInfoTooltipOpen(true);
      })
  }

  function handleLogin(email, password) {
    authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/', { replace: true })
        localStorage.setItem('jwt', res.token)

      })
      .catch(() => {
        setMessage(false);
        setInfoTooltipOpen(true);
      })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.likeCard(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => console.log(err))
    } else {
      api.deleteLike(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => console.log(err))
    }

  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((item) => item.filter((c) => c._id !== card._id && c))
    }).catch((err) => console.log(err))
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      }).catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      }).catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api.addCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((err) => console.log(err))
  }


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }
  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in')
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} onSignOut={onSignOut} />
        <Routes>
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<ProtectedRouteElement
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />} />

        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          status={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;