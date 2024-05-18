import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import UserProfile from "../UserProfile/UserProfile";
import { Link } from "react-router-dom";
import Container from "../Container/Container";

const Header = () => {
  return (
    <div className={css.Header}>
      <Container>
        <div className={css.top}>
          <Link to="/" className={css.logo}>
            <Logo />
          </Link>
          <Link to="/profile" className={css.profile}>
            <UserProfile />
          </Link>
        </div>
      </Container>
      <div className={css.bottom}>
        <Container>
          <nav className={css.nav}>
            <ul className={css.navList}>
              <li className={css.navListItem}>
                <Link to="/">Головна</Link>
              </li>
              <li className={css.navListItem}>
                <Link to="/landmarks">Видатні місця</Link>
              </li>
              <li className={css.navListItem}>
                <Link to="/cities">Міста</Link>
              </li>
              <li className={css.navListItem}>
                <Link to="/">Онлайн чат</Link>
              </li>
            </ul>
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Header;
