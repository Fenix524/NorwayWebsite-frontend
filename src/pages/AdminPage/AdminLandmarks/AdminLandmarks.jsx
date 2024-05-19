import { useSelector } from "react-redux";
import cssTable from "../../../styles/adminTable.module.css";
import FilterBar from "../../../components/FilterBar/FilterBar";
import css from "./AdminLandmarks.module.css";
import { selectLandmarkArr } from "../../../redux/landmarks/landmarks.selectors";
import { useNavigate } from "react-router-dom";

const AdminLandmarks = () => {
  const navigate = useNavigate();
  const landmarkArr = useSelector(selectLandmarkArr);
  return (
    <div className={css.AdminLandmarks}>
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
          {landmarkArr.map((item) => {
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
                        navigate(`/landmarks/${id}`);
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

export default AdminLandmarks;
