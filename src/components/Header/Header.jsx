import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import UserProfile from "../UserProfile/UserProfile";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import AuthorizateBar from "../AuthorizateBar/AuthorizateBar";
import { useSelector } from "react-redux";
import {
  selectIsAuthorize,
  selectUserRole,
} from "../../redux/auth/auth.selectors";

const Header = () => {
  const іsAuthorize = useSelector(selectIsAuthorize);
  const userRole = useSelector(selectUserRole);
  // const { іsAuthorize, userRole } = useAuth();
  // const dispatch = useDispatch()

  return (
    <div className={css.Header}>
      <Container>
        <div className={css.top}>
          <Link to="/" className={css.logo}>
            <Logo />
          </Link>
          {іsAuthorize && (
            <Link to="/profile" className={css.profile}>
              <UserProfile />
            </Link>
          )}
          {!іsAuthorize && <AuthorizateBar />}
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
                <Link to="/answers">Форум</Link>
              </li>
              {userRole === "admin" && іsAuthorize && (
                <li className={css.navListItem}>
                  <Link to="/admin">Адмін панель</Link>
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Header;
