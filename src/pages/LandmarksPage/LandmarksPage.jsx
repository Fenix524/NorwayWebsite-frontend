import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import css from "./LandmarksPage.module.css";

import CardSet from "../../components/CardSet/CardSet";
import Card from "../../components/Card/Card";
import { citiesTestArr } from "../../utils/axios/citiesOperation";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useSelector } from "react-redux";
import { selectCityArr } from "../../redux/cities/cities.selectors";
import { selectLandmarkArr } from "../../redux/landmarks/landmarks.selectors";
import baseCss from "../../styles/base.module.css";
import { useNavigate } from "react-router-dom";

const LandmarksPage = () => {
  const navigate = useNavigate();
  const landmarksArr = useSelector(selectLandmarkArr);
  return (
    <section className={baseCss.mainWrapper}>
      <Container>
        <Title
          desc={"Тут ви можете переглянути інформацію про памятки Норвегії"}
        >
          Памятки Норвегії
        </Title>
        <FilterBar />
        <CardSet>
          {landmarksArr.map((item) => {
            return (
              <li
                key={item.name}
                onClick={() => {
                  console.log(item.name);
                  navigate(`/landmarks/${item.id}`);
                }}
              >
                <Card
                  id={item.id}
                  title={item.name}
                  subtitle={item.shortDesc}
                  bgUrl={item.images[0].url}
                  onClick={() => {
                    console.log(item.name);
                  }}
                />
              </li>
            );
          })}
        </CardSet>
      </Container>
    </section>
  );
};

export default LandmarksPage;
