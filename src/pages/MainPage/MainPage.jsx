import { useSearchParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Title from "../../components/Title/Title";
import css from "./MainPage.module.css";
import { useState } from "react";
import Country from "./Country/Country";
import CardSet from "../../components/CardSet/CardSet";
import Card from "../../components/Card/Card";
import ParagraphWithNumber from "../../components/ParagraphWithNumber/ParagraphWithNumber";
import { citiesTestArr } from "../../utils/axios/citiesOperation";

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Get section index from URL parameters
  console.log(searchParams.get("sectionIndex"));
  const [infoSectionIndex, setInfoSectionIndex] = useState(
    parseInt(searchParams.get("sectionIndex")) || 1
  );
  const infoSections = [
    { label: "Норвегія", value: 1 },
    { label: "Столиця", value: 2 },
    { label: "Валюта", value: 3 },
    { label: "Міста", value: 4 },
    { label: "Робота", value: 5 },
  ];

  const handleButtonClick = (value) => {
    setInfoSectionIndex(value);
    // Update URL with the selected section index
    searchParams.set("sectionIndex", value);
    setSearchParams(searchParams);
  };

  const renderSection = (infoSectionIndex) => {
    switch (infoSectionIndex) {
      case 1:
        return <Country />;
      case 2:
        return "2";
      case 3:
        return "3";
      case 4:
        return "4";
      case 5:
        return "5";
      default:
        return null;
    }
  };

  return (
    <>
      <section className={css.hero}>
        <Container>
          <h1 className={css.title}>НОРВЕГІЯ</h1>
        </Container>
      </section>

      <Section>
        <Container>
          <Title
            desc={"Тут ви можете переглянути коротку інформацію про країну"}
          >
            Норвегія
          </Title>

          <ul className={css.navList}>
            {infoSections.map((section) => (
              <li key={section.value} className={css.navListItem}>
                <button
                  className={css.navListBtn}
                  onClick={() => handleButtonClick(section.value)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>

          {renderSection(infoSectionIndex)}

          <p></p>
        </Container>
      </Section>
      <Section>
        <Container>
          <Title
            desc={"Тут ви можете переглянути інформацію про міста Норвегії"}
          >
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
      </Section>
      <Section>
        <Container>
          <Title>Цікаві факти про життя в Норвегії</Title>
          <ul className={css.factsList}>
            <li className={css.factsListItem}>
              <ParagraphWithNumber number={"01"}>
                Уже кілька років Норвегія займає перше місце в рейтингу найбільш
                комфортних для життя країн. Безробіття в цій країні складає
                всього 3%, а середня зарплата дорівнює 43 800 крон в місяць (333
                000 рублів). Найбільше отримують норвежці, зайняті на
                нафтовидобувних підприємствах. Їх щомісячний дохід часто
                перевищує 65 000 крон (495 000 рублів).
              </ParagraphWithNumber>
            </li>
            <li className={css.factsListItem}>
              <ParagraphWithNumber number={"02"}>
                Після досягнення 67 років жителі Норвегії мають право на
                призначення пенсії по старості. Її величина встановлюється
                державою. В даний час вона дорівнює 176 000 крон на рік (1 338
                000 рублів). Особи, які прожили в Норвегії більше 40 років,
                отримують пенсію в повному розмірі, а іммігранти, постійно
                перебували на території країни не менше 3 років, тільки її
                частину.
              </ParagraphWithNumber>
            </li>
            <li className={css.factsListItem}>
              <ParagraphWithNumber number={"03"}>
                Завдяки прогресивної податкової ставкою, розмір якої коливається
                від 27 до 80%, в Норвегії немає особливої ​​різниці між багатими
                і бідними. Практично всі її жителі можуть дозволити собі власне
                житло і щорічний відпочинок в теплих країнах.
              </ParagraphWithNumber>
            </li>
            <li className={css.factsListItem}>
              <ParagraphWithNumber number={"04"}>
                Зарплата - найважливіше, через що сюди тягнуться люди. Тут при
                виконанні простої роботи, пов'язаної, припустимо, з будівництвом
                або прибиранням, твій дохід часто може бути більше, ніж у
                людини, що сидить в офісі і займає провідну посаду в рідній
                країні. Потім - природа, риболовля, гриби, в загальному, якщо є
                час, то зайнятися тут можна чим завгодно. Ця країна для людей, а
                не для олігархів та мільйонерів. Ти відчуваєш впевненість в
                завтрашньому дні.
              </ParagraphWithNumber>
            </li>
          </ul>
        </Container>
      </Section>
      <Section>
        <Container>
          <Title
            desc={"Тут ви можете переглянути інформацію про памятки Норвегії"}
          >
            Памятки Норвегії
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
      </Section>
    </>
  );
};

export default MainPage;
