import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { useInput } from "../utils/useInput";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
}) {
  const [avatarLink, setAvatarLink] = useState("");

  const link = useInput("", { isEmpty: true, minLength: 0, isUrl: false });

  const [errorMessageLink, setErrorMessageLink] = useState("");

  useEffect(() => {
    setErrorMessageLink("");
    setAvatarLink("");
    link.setInputValid(true);
  }, [onClose, onUpdateAvatar]);

  function handleAvatarLinkChange(e) {
    setAvatarLink(e.target.value);
    link.onChange(e);
    setErrorMessageLink(e.target.validationMessage);
  }

  function handleSubmitAvatar(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink,
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitAvatar}
      buttonText={buttonText}
      onDisabled={!link.inputValid}
    >
      <input
        type="url"
        className="popup__input popup__input_link"
        name="avatar"
        placeholder="Ссылка на картинку"
        id="link-avatar"
        value={avatarLink || ""}
        onChange={handleAvatarLinkChange}
        onFocus={link.onFocus}
        required
      />
      {((link.isDirty && link.isEmpty) ||
        (link.isDirty && link.minLengthError) ||
        (link.isDirty && link.urlError)) && (
        <span className="popup__error link-avatar-error popup__input-error popup__input-error_active">
          {errorMessageLink}
        </span>
      )}
    </PopupWithForm>
  );
}
