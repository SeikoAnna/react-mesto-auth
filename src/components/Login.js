import { useForm } from "../hooks/useForm.js";

export default function Login({ onLogin }) {
  const { formValue, handleChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    onLogin(formValue);
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
  );
}
