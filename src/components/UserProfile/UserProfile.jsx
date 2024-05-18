import css from './UserProfile.module.css'

const UserProfile = () => {
  return (
    <div className={css.UserProfile}>
      <div className={css.left}>
        <p className={css.name}>Олександра Джопс</p>
        <p className={css.email}>oleksandra@gmail.com</p>
      </div>
      <div className={css.right}>
        <img src='' alt='' className={css.userLogo} />
      </div>
    </div>
  )
}

export default UserProfile
