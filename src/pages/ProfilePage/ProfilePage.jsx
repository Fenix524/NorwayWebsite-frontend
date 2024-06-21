import { useDispatch, useSelector } from "react-redux";
import css from "./ProfilePage.module.css";
import { selectUser } from "../../redux/auth/auth.selectors";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import MiniModal from "../../components/MiniModal/MiniModal";
import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import {
  changeAvatar,
  changeMe,
  destroyUser,
  logOut,
} from "../../redux/auth/auth.operations";
import {
  getOneBookmark,
  togleBookmarks,
} from "../../utils/axios/bookmarkAxios";
import { Link } from "react-router-dom";
import { IoBookmark } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi";

const ProfilePage = () => {
  const [modalInfo, setModalInfo] = useState({
    label: "",
    name: "",
    isShowed: false,
  });
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [thisBookmark, setThisBookmark] = useState([]);

  useEffect(() => {
    const fetchPage = async () => {
      const bookmark = await getOneBookmark();
      console.log(bookmark);
      setThisBookmark(bookmark);
    };

    fetchPage();
  }, []);

  const { name, email, role, avatarURL, password } = useSelector(selectUser);

  const onClick = (name, label) => {
    setModalInfo({ label: label, name: name, isShowed: true });
  };

  const removeBookmark = async (id) => {
    try {
      const res = await togleBookmarks(id);
      if (res) {
        setThisBookmark((prevBookmark) => {
          const removedIndex = prevBookmark.populatedPages.findIndex(
            (p) => p._id === id
          );

          if (removedIndex !== -1) {
            const updatedPages = [
              ...prevBookmark.populatedPages.slice(0, removedIndex),
              ...prevBookmark.populatedPages.slice(removedIndex + 1),
            ];
            return { ...prevBookmark, populatedPages: updatedPages };
          }

          return prevBookmark;
        });
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <>
      <div className={css.wrapper}>
        <Container>
          <div className={css.ProfilePage}>
            <div className={css.imgContainer}>
              <img src={avatarURL} alt="User avatar" className={css.img} />
              <label className={css.changeBtn} htmlFor="file-input">
                <FaPencilAlt size={16} />
              </label>
              <input
                type="file"
                id="file-input"
                className={css.fileInput}
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  dispatch(changeAvatar(e.target.files[0]));
                }}
              />
            </div>
            <ul className={css.userSetingsList}>
              <li className={css.userSetingsItem}>
                Імя: <span>{name}</span>
                <button
                  className={css.changeBtn}
                  onClick={() => {
                    onClick("name", "імя");
                  }}
                >
                  <FaPencilAlt size={16} />
                </button>
              </li>
              <li className={css.userSetingsItem}>
                Пошта: <span>{email}</span>
                <button
                  className={css.changeBtn}
                  onClick={() => {
                    onClick("email", "Пошта");
                  }}
                >
                  <FaPencilAlt size={16} />
                </button>
              </li>
            </ul>
            <div className={css.buttonContainer}>
              <Button
                style={"bordered"}
                onClick={() => {
                  dispatch(logOut());
                }}
              >
                Вийти з профілю
              </Button>
              <div className={css.deleteBtnWrapper}>
                <Button
                  style={"bordered"}
                  onClick={() => {
                    dispatch(destroyUser());
                  }}
                >
                  Видалити профіль
                </Button>
              </div>
            </div>
          </div>
          {thisBookmark && (
            <div className={css.BookmarksPage}>
              <Title>Закладки</Title>
              {thisBookmark?.populatedPages ? (
                <ul className={css.bookmarkList}>
                  {thisBookmark?.populatedPages?.map((page, index) => {
                    console.log(page);
                    return (
                      <li key={page._id} className={css.bookmarkListItem}>
                        <div>
                          <p className={css.bookmarkTitle}>{page.name}</p>
                          <p className={css.bookmarkDesk}>{page.shortDesc}</p>
                        </div>
                        <div className={css.buttonBox}>
                          <button
                            className={css.bookmarkBtn}
                            onClick={async () => {
                              await removeBookmark(page._id);
                            }}
                          >
                            <HiOutlineTrash size={20} />
                          </button>
                          <Link
                            className={css.bookmarkBtn}
                            to={`/${
                              page.pageType === "City" ? "cities" : "landmarks"
                            }/${page._id}`}
                          >
                            <LuEye size={20} />
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>Ой, тут порожньо!</p>
              )}
            </div>
          )}
        </Container>
      </div>
      {modalInfo.isShowed && (
        <MiniModal
          label={modalInfo.label}
          name={modalInfo.name}
          onSubmit={(value) => {
            console.log("Дані форми", value);
            dispatch(changeMe({ id: currentUser._id, data: value }));
          }}
          onClose={() => {
            setModalInfo({ isShowed: false });
          }}
        />
      )}
    </>
  );
};

export default ProfilePage;
