import { useSelector } from "react-redux";
import css from "./UserProfile.module.css";
import { selectUser } from "../../redux/auth/auth.selectors";

const UserProfile = () => {
  const { name, email, avatarURL } = useSelector(selectUser);
  console.log(avatarURL);
  return (
    <div className={css.UserProfile}>
      <div className={css.left}>
        <p className={css.name}>{name}</p>
        <p className={css.email}>{email}</p>
      </div>
      <div className={css.right}>
        <img src={avatarURL} alt="" className={css.userLogo} />
      </div>
    </div>
  );
};

export default UserProfile;
