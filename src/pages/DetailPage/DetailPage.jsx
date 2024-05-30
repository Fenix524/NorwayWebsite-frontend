import { useParams } from "react-router-dom";
import css from "./DetailPage.module.css";
import baseCss from "../../styles/base.module.css";
import Container from "../../components/Container/Container";
import { useSelector } from "react-redux";
import Title from "../../components/Title/Title";
import ImgSet from "../../components/ImgSet/ImgSet";
import { getOneCity } from "../../utils/axios/cityAxios";
import { getOneLandmark } from "../../utils/axios/landmarkAxios";
import { useEffect, useState } from "react";

import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import {
  addToBookmarks,
  getAllBookmarks,
  getOneBookmark,
  togleBookmarks,
} from "../../utils/axios/bookmarkAxios";
// import { getAllBookmarks } from "../../utils/axios/bookmarkAxios";

const DetailPage = ({ modelSelector }) => {
  const { id } = useParams();
  const [thisItem, setThisItem] = useState();
  const [thisBookmark, setThisBookmark] = useState();

  useEffect(() => {
    const fetchPage = async () => {
      const getMethod = modelSelector === "City" ? getOneCity : getOneLandmark;
      const item = await getMethod(id);
      setThisItem(item);

      const bookmark = await getOneBookmark();
      console.log(bookmark);
      setThisBookmark(bookmark);
    };

    fetchPage();
  }, []);

  if (!thisItem) {
    return <div>Loading...</div>; // Покажіть що дані завантажуються
  }

  const addBookmark = async () => {
    togleBookmarks(thisItem._id).then((res) => {
      console.log({ res, thisBookmark, thisItem });
      setThisBookmark(res);
    });
  };

  const { name, shortDesc, images, sections } = thisItem;
  console.log(images);
  return (
    thisItem && (
      <div className={css.mainWrapper}>
        <section
          className={css.hero}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${thisItem.images[0].url})`,
          }}
        >
          <button className={css.bookmarkBtn} onClick={addBookmark}>
            {thisBookmark?.pages?.includes(thisItem._id) ? (
              <IoBookmark size={50} />
            ) : (
              <IoBookmarkOutline size={50} />
            )}
          </button>
          <Container>
            <div className={css.heroTextWrapper}>
              <h1 className={css.title}>{name}</h1>
              <p>{shortDesc}</p>
            </div>
          </Container>
        </section>
        {sections.map((section) => {
          const { title, content, images } = section;

          return (
            <section className={css.section} key={title}>
              <Container>
                <Title>{title}</Title>
                <p>{content}</p>
                <ImgSet
                  imgArr={images.map((url) => ({ src: url, alt: "???" }))}
                />
              </Container>
            </section>
          );
        })}
        <section className={css.section}>
          <Container>
            <Title
              desc={
                "Тут ви можете переглянути різноманітні зображення, пов'язані з цією темою."
              }
            >
              Глерея зображень
            </Title>
            <ImgSet
              imgArr={images.map((img) => ({
                src: img.url,
                alt: img.description,
              }))}
            />
          </Container>
        </section>
      </div>
    )
  );
};

export default DetailPage;
