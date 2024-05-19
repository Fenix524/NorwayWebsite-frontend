import Button from "../Button/Button";
import css from "./AuthorizateBar.module.css";
import { Link } from "react-router-dom";

const AuthorizateBar = () => {
  return (
    <div className={css.AuthorizateBar}>
      <Link to={"/signup"}>
        <Button style={"transparent"}>Реєстрація</Button>
      </Link>
      <Link to={"/login"}>
        <Button>Авторизація</Button>
      </Link>
    </div>
  );
};

export default AuthorizateBar;
