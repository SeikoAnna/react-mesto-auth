import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CardContext } from '../contexts/CardContex.js';
export default function Main({
  onEditAvatar,
  onEditProfile,
  onCardClick,
  onCardDelete,
  onClick,
  onDeleteImage,
  onAddPlace,
  onCardLike,
 
}) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardContext);
  const userName = currentUser.name;
  const userDescription = currentUser.about;
  const userAvatar = currentUser.avatar;

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-btn"
          type="button"
          onClick={onEditAvatar}
        >
          <img className="profile__avatar" src={userAvatar} alt="аватар" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавлять"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}
