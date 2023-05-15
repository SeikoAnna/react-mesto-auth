import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const isOwn = card.owner._id === currentUser._id;

  function handleImageClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <button className="element__picture-botton" type="button">
        <img
          className="element__picture"
          src={card.link}
          alt={card.name}
          onClick={handleImageClick}
        />
      </button>
      {isOwn && (
        <button
          className="element__delete"
          type="button"
          onClick={handleCardDelete}
        />
      )}
      <div className="element__content">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like_container">
          <button
            type="button"
            className={`element__like ${isLiked && "element__like_active"}`}
            onClick={handleLikeClick}
          />
          <p className="element__like_amount">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
