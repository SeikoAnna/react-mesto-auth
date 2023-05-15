export default function PopupWithForm({
  name,
  isOpen,
  title,
  onClose,
  buttonText,
  onSubmit, 
  onDisabled,
  children,
}) {

  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }
  
  return (
    <div className={`popup ${isOpen && ("popup_opened")} popup_${name}`} onMouseDown={handleClickClose}>
      <div className="popup__conteiner">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{`${title}`}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={`form_${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button 
          type="submit"
          className={onDisabled ? "popup__submit-popup-btn popup__submit-popup-btn_disabled"  : "popup__submit-popup-btn"}
          disabled={onDisabled}>
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
