import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";

const Register = ({ onRegister, onInfoTooltipClick }) => {
  const { formValue, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue);
    onInfoTooltipClick();
  };

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
    </>
  );
};

export default Register;
