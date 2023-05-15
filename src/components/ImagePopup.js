export default function ImagePopup({ card, isOpen, onClose }) {
  function handleClickClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      onClose();
    }
  }
  return (
    <div
      id="popup_photo"
      className={`popup ${isOpen && "popup_opened"}`}
      onMouseDown={handleClickClose}
    >
      <figure className="popup__photo-conteiner">
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__photo-title">{card.name}</h2>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}
