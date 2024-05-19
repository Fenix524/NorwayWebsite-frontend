import { useParams } from "react-router-dom";
import css from "./DetailPage.module.css";
import baseCss from "../../styles/base.module.css";
import Container from "../../components/Container/Container";
import { useSelector } from "react-redux";
import { selectCityArr } from "../../redux/cities/cities.selectors";
import Title from "../../components/Title/Title";
import ImgSet from "../../components/ImgSet/ImgSet";

const DetailPage = ({ arraySelector }) => {
  const { id } = useParams();
  const thisItem = useSelector(arraySelector).find((item) => item.id === id);
  const { name, shortDesc, images, sections } = thisItem;
  console.log(thisItem);
  return (
    <>
      <section
        className={css.hero}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${thisItem.images[0].url})`,
        }}
      >
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
          <Container key={title}>
            <section className={css.section}>
              <Title>{title}</Title>
              <p>{content}</p>
              <ImgSet
                imgArr={images.map((url) => ({ src: url, alt: "???" }))}
              />
            </section>
          </Container>
        );
      })}
    </>
  );
};

export default DetailPage;
