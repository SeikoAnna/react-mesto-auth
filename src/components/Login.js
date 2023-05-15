import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

export default function Login ({
  handleLoggedIn,
})
{
 
  const navigate = useNavigate();

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
    auth.authorization(formValue.email, formValue.password)
      .then((data) => {
        if (data) {
          handleLoggedIn();
          setFormValue({ email: '', password: '' });
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="registration">
      <h1 className="registration__title">Вход</h1>
      <form className="registration__form" onSubmit={handleSubmit}>
        <input
          className="registration__input"
          type="email"
          placeholder="Email"
          name="email"
          minLength="5"
          maxLength="40"
          value={formValue.email}        
          onChange={handleChange}
          required
        ></input>
        <input
          className="registration__input"
          type="password"
          placeholder="Пароль"
          name="password"
          minLength="2"
          maxLength="100"
          value={formValue.password} 
          onChange={handleChange}
          required          
        ></input>
        <button className="registration__button">Войти</button>
      </form>
    </div>
  )
}
