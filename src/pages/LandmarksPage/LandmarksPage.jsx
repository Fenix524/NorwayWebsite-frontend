import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import css from "./LandmarksPage.module.css";

import CardSet from "../../components/CardSet/CardSet";
import Card from "../../components/Card/Card";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useSelector } from "react-redux";
import { selectLandmarkArr } from "../../redux/landmarks/landmarks.selectors";
import baseCss from "../../styles/base.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios/axios";

const LandmarksPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [landmarksArr, setLandmarskArr] = useState([]);

  useEffect(() => {
    async function getCities() {
      try {
        const params = {
          filter: {
            name: searchParams.get("search"),
            shortDesc: searchParams.get("search"),
          },
          sort: {
            name: searchParams.get("sort"),
          },
        };

        const response = await axiosInstance.get("/landmarks", { params });
        console.log("Pfffffffffff", response.data.data);
        setLandmarskArr(response.data.data);
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
        // Додайте обробку помилок тут
      }
    }

    getCities();
  }, [searchParams]);

  if (!landmarksArr) {
    return <div>Loading...</div>; // Покажіть що дані завантажуються
  }

  return (
    <section className={baseCss.mainWrapper}>
      <Container>
        <Title
          desc={"Тут ви можете переглянути інформацію про памятки Норвегії"}
        >
          Памятки Норвегії
        </Title>
        <FilterBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        {!landmarksArr ? (
          <p>Ой, тут порожньо</p>
        ) : (
          <CardSet>
            {landmarksArr.map((item) => {
              return (
                <li
                  key={item.name}
                  onClick={() => {
                    console.log(item.name);
                    navigate(`/landmarks/${item._id}`);
                  }}
                >
                  <Card
                    id={item.id}
                    title={item.name}
                    subtitle={item.shortDesc}
                    bgUrl={item.images[0]?.url}
                    onClick={() => {
                      console.log(item.name);
                    }}
                  />
                </li>
              );
            })}
          </CardSet>
        )}
      </Container>
    </section>
  );
};

export default LandmarksPage;
