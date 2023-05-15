import pictureOk from '../images/pictureOk.svg';
import pictureError from '../images/pictureError.svg';

export default function InfoTooltip({ isOpen, onClose, isRegister }) {

  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }
  
  return (
    <section className={`popup ${isOpen && ("popup_opened")} popup_registration`} onMouseDown={handleClickClose}>
      <div className="popup__conteiner">
          <img className="popup__picture" src={isRegister.status ? pictureOk : pictureError} alt={'Инфо-картинка'} />
          <h3 className="popup__title popup__title_info">{isRegister.message}</h3>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </section>
  )
}