import { useSelector } from "react-redux";
import css from "./ProfilePage.module.css";
import { selectUser } from "../../redux/auth/auth.selectors";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import MiniModal from "../../components/MiniModal/MiniModal";

const ProfilePage = () => {
  const [modalShow, setModalShow] = useState(false);

  const { firstName, lastName, email, role, avatarUrl, password } =
    useSelector(selectUser);

  const onClick = () => {
    setModalShow(true);
  };

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.ProfilePage}>
          <img src={avatarUrl} alt="User avatar" className={css.img} />
          <ul className={css.userSetingsList}>
            <li className={css.userSetingsItem}>
              Імя: <span>{firstName}</span>
              <button className={css.changeBtn} onClick={onClick}>
                <FaPencilAlt size={16} />
              </button>
            </li>
            <li className={css.userSetingsItem}>
              Прізвище: <span>{lastName}</span>
              <button className={css.changeBtn}>
                <FaPencilAlt size={16} />
              </button>
            </li>
            <li className={css.userSetingsItem}>
              Роль: <span>{role}</span>
              <button className={css.changeBtn}>
                <FaPencilAlt size={16} />
              </button>
            </li>
            <li className={css.userSetingsItem}>
              Пошта: <span>{email}</span>
              <button className={css.changeBtn}>
                <FaPencilAlt size={16} />
              </button>
            </li>
            <li className={css.userSetingsItem}>
              Пароль: <span>{password}</span>
              <button className={css.changeBtn}>
                <FaPencilAlt size={16} />
              </button>
            </li>
          </ul>
        </div>
      </div>
      {modalShow && (
        <ModalWrapper>
          <MiniModal label={"Імя"} name={"firstName"} />
        </ModalWrapper>
      )}
    </>
  );
};

export default ProfilePage;
