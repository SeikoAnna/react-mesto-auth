import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip.js';

export default function Register() {
  
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  function closePopup() {
    setInfoTooltipPopupOpen(false);
  }

  const [isRegister, setRegister] = useState({
    status: '',
    message: ''
  });

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(formValue.email, formValue.password)
      .then((res) => {
        if (res.data) {
          setFormValue({ email: '', password: '' });
          setInfoTooltipPopupOpen(true);
          setRegister({
            status: true,
            name: "registration",
            message: 'Вы успешно зарегистрировались!'
          })
        } else {
          setInfoTooltipPopupOpen(true);
          setRegister({
            status: false,
            message: 'Что-то пошло не так! Попробуйте еще раз'
          })
        };
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="registration">
        <h1 className="registration__title">Регистрация</h1>
        <form className="registration__form" onSubmit={handleSubmit}>
          <input
            className="registration__input"
            name="email"
            placeholder="Email"
            type="email"
            minLength="5"
            maxLength="40"
            onChange={handleChange}
            value={formValue.email}
            required
            ></input>
          <input
            className="registration__input"
            name="password" 
            placeholder="Пароль"
            type="password"
            minLength="2"
            maxLength="100"
            onChange={handleChange}
            value={formValue.password}
            required
           ></input>
          <button className="registration__button">Зарегистрироваться</button>
          <Link className="registration__link" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closePopup}
        isRegister={isRegister}
      />
    </>
  )
}
