import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import css from "./CitiesPage.module.css";

import CardSet from "../../components/CardSet/CardSet";
import Card from "../../components/Card/Card";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useSelector } from "react-redux";
import { selectCityArr } from "../../redux/cities/cities.selectors";
import baseCss from "../../styles/base.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios/axios";

const CitiesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [citiesArr, setCityArr] = useState([]);

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

        const response = await axiosInstance.get("/cities", { params });
        console.log(response.data);
        setCityArr(response.data.data);
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
        // Додайте обробку помилок тут
      }
    }

    getCities();
  }, [searchParams]);

  if (!citiesArr) {
    return <div>Loading...</div>; // Покажіть що дані завантажуються
  }

  return (
    <section className={baseCss.mainWrapper}>
      <Container>
        <Title desc={"Тут ви можете переглянути інформацію про міста Норвегії"}>
          Міста Норвегії
        </Title>
        <FilterBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        {!citiesArr ? (
          <p>Ой тут порожньо</p>
        ) : (
          <CardSet>
            {citiesArr.map((item) => {
              return (
                <li
                  key={item.name}
                  onClick={() => {
                    console.log(item.name);
                    navigate(`/cities/${item._id}`);
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
        )}
      </Container>
    </section>
  );
};

export default CitiesPage;
