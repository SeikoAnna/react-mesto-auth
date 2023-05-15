import logo from "../images/Vector.svg";
import { Link, Route, Routes } from "react-router-dom";

export default function Header({ email, onLoginOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link className="header__ident" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__ident" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route />
        <Route
          path="/"
          element={
            <div className="header__conteiner">
              <p className="header__email">{email}</p>
              <button
                className="header__login-out"
                to="/sign-in"
                onClick={onLoginOut}
              >
                Выйти
              </button>
            </div>
          }
        />
        <Route />
      </Routes>
    </header>
  );
}
