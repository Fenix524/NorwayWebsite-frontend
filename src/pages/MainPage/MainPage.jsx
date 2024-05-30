import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Title from "../../components/Title/Title";
import css from "./MainPage.module.css";
import { useState } from "react";
import Country from "./Country/Country";
import Capital from "./Capital/Capital";
import Currency from "./Currency/Currency";
import CardSet from "../../components/CardSet/CardSet";
import Card from "../../components/Card/Card";
import ParagraphWithNumber from "../../components/ParagraphWithNumber/ParagraphWithNumber";
import { useCities } from "../../hooks/useCities";
import { useLandmarks } from "../../hooks/useLandmarks";

const MainPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // Get section index from URL parameters
  console.log(searchParams.get("sectionIndex"));
  const [infoSectionIndex, setInfoSectionIndex] = useState(
    parseInt(searchParams.get("sectionIndex")) || 1
  );

  const { cityArr, citiesTotalAmount } = useCities();
  const { landmarkArr, landmarksTotalAmount } = useLandmarks();

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
        return <Capital />;
      case 3:
        return <Currency />;
      case 4:
        return <Country />;
      case 5:
        return <Country />;
      default:
        return null;
    }
  };

  return (
    <div className={css.mainWrapper}>
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
            {cityArr.slice(0, 5).map((item) => {
              return (
                <li
                  key={item.name}
                  onClick={() => {
                    console.log(item);
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
            <Link to={"cities"}>
              <Card
                title={"ПЕРЕГЛЯНУТИ ЩЕ"}
                bgUrl={
                  "https://norwaytravelguide.imgix.net/195136/x/0/what-are-polar-nights-in-norway-1?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883&s=1c14614666df930afcdff347b22a5a45"
                }
              />
            </Link>
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
            {landmarkArr.slice(0, 5).map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    console.log(item.name);
                    navigate(`/landmarks/${item._id}`);
                  }}
                >
                  <Card
                    id={item.id}
                    title={item.name}
                    subtitle={item.shortDesc}
                    bgUrl={item.images[0].url}
                  />
                </li>
              );
            })}
            <Link to={"landmarks"}>
              <Card
                title={"ПЕРЕГЛЯНУТИ ЩЕ"}
                bgUrl={
                  "https://norwaytravelguide.imgix.net/195136/x/0/what-are-polar-nights-in-norway-1?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883&s=1c14614666df930afcdff347b22a5a45"
                }
              />
            </Link>
          </CardSet>
        </Container>
      </Section>
    </div>
  );
};

export default MainPage;
