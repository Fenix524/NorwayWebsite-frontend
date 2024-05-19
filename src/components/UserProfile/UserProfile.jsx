import { useSelector } from "react-redux";
import css from "./UserProfile.module.css";
import { selectUser } from "../../redux/auth/auth.selectors";

const UserProfile = () => {
  const { firstName, lastName, email, avatarUrl } = useSelector(selectUser);

  return (
    <div className={css.UserProfile}>
      <div className={css.left}>
        <p className={css.name}>{`${firstName} ${lastName}`}</p>
        <p className={css.email}>{email}</p>
      </div>
      <div className={css.right}>
        <img src={avatarUrl} alt="" className={css.userLogo} />
      </div>
    </div>
  );
};

export default UserProfile;
