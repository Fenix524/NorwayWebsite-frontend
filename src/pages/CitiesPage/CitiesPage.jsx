import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import css from "./CitiesPage.module.css";

import CardSet from "../../components/CardSet/CardSet";
import Card from "../../components/Card/Card";
import { citiesTestArr } from "../../utils/axios/citiesOperation";

const CitiesPage = () => {
  return (
    <section className={css.mainSection}>
      <Container>
        <Title desc={"Тут ви можете переглянути інформацію про міста Норвегії"}>
          Міста Норвегії
        </Title>
        <CardSet>
          {citiesTestArr.map((item) => {
            return (
              <li key={item.title}>
                <Card
                  title={item.title}
                  subtitle={item.subtitle}
                  onClick={() => {
                    console.log(item.title);
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

export default CitiesPage;