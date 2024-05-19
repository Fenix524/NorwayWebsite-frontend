import css from "./AdminCities.module.css";
import cssTable from "../../../styles/adminTable.module.css";
import FilterBar from "../../../components/FilterBar/FilterBar";
import { useSelector } from "react-redux";
import { selectCityArr } from "../../../redux/cities/cities.selectors";
import { useNavigate } from "react-router-dom";

const AdminCities = () => {
  const citiesArr = useSelector(selectCityArr);
  const navigate = useNavigate();

  return (
    <div className={css.AdminCities}>
      <FilterBar />
      <table className={cssTable.table}>
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Опис</th>
            <th>Зображення</th>
            <th></th> {/* Пустий заголовок для кнопки редагування */}
          </tr>
        </thead>
        <tbody>
          {citiesArr.map((item) => {
            const { id, name, shortDesc, images } = item;
            return (
              <tr key={name}>
                <td>{name}</td>
                <td>{shortDesc}</td>
                <td>
                  <img src={images[0].url} />
                </td>
                <td>
                  <div className={cssTable.buttonBox}>
                    <button
                      onClick={() => {
                        console.log(name);
                      }}
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => {
                        console.log(name);
                        navigate(`/cities/${id}`);
                      }}
                    >
                      Переглянути
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCities;
