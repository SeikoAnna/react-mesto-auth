import PopupWithForm from "./PopupWithForm.js";

export default function PopupConfirmDelete({
  isOpen,
  onClose,
  handleCardDelete,
  buttonText,
}) {
  function handleDeleteCard(e) {
    e.preventDefault();
    handleCardDelete();
  }

  return (
    <PopupWithForm
      name={"element__delete"}
      title={"Вы уверены?"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteCard}
      buttonText={buttonText}
    />
  );
}
