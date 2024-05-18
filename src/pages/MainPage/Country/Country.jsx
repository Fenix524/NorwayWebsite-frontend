import css from "./Country.module.css";
import Paragraph from "../../../components/Pragraph/Pragraph";
import ImgSet from "../../../components/ImgSet/ImgSet";
// Імпортуйте зображення
import img1 from "../../../images/mainPageCity/01.jpg";
import img2 from "../../../images/mainPageCity/02.jpg";
import img3 from "../../../images/mainPageCity/03.jpg";

const Country = () => {
  return (
    <div className={css.Country}>
      <Paragraph>
        <strong>Норвегія</strong> (Norway) — країна контрастів і гострих
        відчуттів. Тут величні гори нависають над таємничими фіордами; сувору
        зиму нерідко змінює розкішне літо; а довгі полярні ночі поступаються
        місцем білим ночам. Ця країна дасть змогу мандрівникові скуштувати і
        традиційного укладу життя, і благ сучасної цивілізації, і природних
        красот, і міських задоволень.
      </Paragraph>
      <Paragraph>
        Норвегія, відома переважно своїми природними красотами, багата ще
        історією та культурним життям. Влітку тут відбувається багато подій,
        пов'язаних із природою та культурою, включно зі святами та концертами
        просто неба серед мальовничих місць. Зима пропонує свої розваги, від лиж
        та інших спортивних забав до різдвяних ярмарків і такого видовища, як
        північне сяйво.
      </Paragraph>
      <ImgSet
        imgArr={[
          { src: img1, alt: "???" },
          { src: img2, alt: "???" },
          { src: img3, alt: "???" },
        ]}
      />
    </div>
  );
};

export default Country;
