import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupConfirmDelete from "./PopupConfirmDelete.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import ProtectedRouteElement from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import * as auth from "../utils/auth.js";
import { CardContext } from "../contexts/CardContex.js";
import InfoTooltip from "./InfoTooltip.js"; 

export default function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditAddPlacePopupOpen, setEditAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isPopupConfirmDeleteOpen, setPopupConfirmDeleteOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function loginOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    navigate("/sign-in", { replace: true });
  }





  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getUser(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
      api
        .getCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => console.log(err));
    }
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setEditAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setDeletedCard(card);
    setPopupConfirmDeleteOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setPopupConfirmDeleteOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(name, description) {
    setIsLoading(true);
    api
      .setUserInfo(name, description)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .setNewAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    if (
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isEditAddPlacePopupOpen ||
      isImagePopupOpen ||
      isPopupConfirmDeleteOpen||
      isInfoTooltipOpen
    ) {
      document.addEventListener("keydown", close);
    }
    return () => {
      document.removeEventListener("keydown", close);
    };
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isEditAddPlacePopupOpen,
    isImagePopupOpen,
    isPopupConfirmDeleteOpen,
    isInfoTooltipOpen,
  ]);

  function handleAddCard(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="page">
          <Header email={email} onLoginOut={loginOut} />
          <Routes>
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/sign-in"
              element={<Login handleLoggedIn={handleLoggedIn} />}
            />
            <Route path="/sign-up" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleDeleteCardClick}
                  onCardLike={handleCardLike}
                />
              }
            />
          </Routes>
          {isLoggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <AddPlacePopup
            isOpen={isEditAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddCard}
            buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <PopupConfirmDelete
            isOpen={isPopupConfirmDeleteOpen}
            onClose={closeAllPopups}
            handleCardDelete={handleCardDelete}
            buttonText={isLoading ? "Удаление..." : "Да"}
          />
          <ImagePopup
            name={"image"}
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}
