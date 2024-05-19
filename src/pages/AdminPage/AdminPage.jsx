import { Link, Outlet } from "react-router-dom";
import css from "./AdminPage.module.css";

const AdminPage = () => {
  return (
    <div className={css.AdminPage}>
      <div className={css.navSide}>
        <ul className={css.navList}>
          <li className={css.navItem}>
            <Link className={css.navLink} to={"users"}>
              <p>👥 Користувачі 👤</p>
            </Link>
          </li>
          <li className={css.navItem}>
            <Link className={css.navLink} to={"cities"}>
              <p>🏙️ Міста 🌆</p>
            </Link>
          </li>
          <li className={css.navItem}>
            <Link className={css.navLink} to={"landmarks"}>
              <p>🏛️ Памятки ⛩️</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.viewSide}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
