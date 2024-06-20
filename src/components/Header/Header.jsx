import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import UserProfile from "../UserProfile/UserProfile";
import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import AuthorizateBar from "../AuthorizateBar/AuthorizateBar";
import { useSelector } from "react-redux";
import {
  selectIsAuthorize,
  selectUserRole,
} from "../../redux/auth/auth.selectors";
import { FiAlignCenter } from "react-icons/fi";
import { useState } from "react";

const Header = () => {
  const isAuthorize = useSelector(selectIsAuthorize);
  const userRole = useSelector(selectUserRole);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleNavClick = (e) => {
    if (e.target.tagName === "A") {
      setIsOpenMenu(false);
    }
  };

  const getNavLinkClassName = ({ isActive }) => {
    console.log(isActive);
    return isActive ? css.active : undefined;
  };

  return (
    <div className={css.Header}>
      <div className={css.top}>
        <Container>
          <NavLink to="/" className={css.logo}>
            <Logo />
          </NavLink>

          {isAuthorize && (
            <NavLink to="/profile" className={css.profile}>
              <UserProfile />
            </NavLink>
          )}
          {!isAuthorize && <AuthorizateBar />}
        </Container>
      </div>
      <div className={css.bot}>
        <Container>
          <nav className={css.nav} onClick={handleNavClick}>
            <button
              className={css.burgerMenu}
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <FiAlignCenter size={40} />
            </button>
            <ul className={`${css.navList} ${isOpenMenu ? css.open : ""}`}>
              <li className={css.navListItem}>
                <NavLink to="/" className={getNavLinkClassName}>
                  Головна
                </NavLink>
              </li>
              <li className={css.navListItem}>
                <NavLink to="/landmarks" className={getNavLinkClassName}>
                  Видатні місця
                </NavLink>
              </li>
              <li className={css.navListItem}>
                <NavLink to="/cities" className={getNavLinkClassName}>
                  Міста
                </NavLink>
              </li>
              <li className={css.navListItem}>
                <NavLink to="/answers" className={getNavLinkClassName}>
                  Форум
                </NavLink>
              </li>
              {userRole === "admin" && isAuthorize && (
                <li className={css.navListItem}>
                  <NavLink to="/admin" className={getNavLinkClassName}>
                    Адмін панель
                  </NavLink>
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
