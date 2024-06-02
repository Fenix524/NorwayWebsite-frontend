import { useSelector } from "react-redux";
import cssTable from "../../../styles/adminTable.module.css";
import FilterBar from "../../../components/FilterBar/FilterBar";
import css from "./AdminLandmarks.module.css";
import { selectLandmarkArr } from "../../../redux/landmarks/landmarks.selectors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios/axios";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi";

const AdminLandmarks = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [landmarkArr, setLandmarkArr] = useState([]);

  useEffect(() => {
    async function getCities() {
      try {
        const params = {
          filter: {
            name: searchParams.get("search"), // Поле для фільтрації
          },
          sort: {
            name: searchParams.get("sort"),
          },
        };

        const response = await axiosInstance.get("/landmarks", { params });
        console.log(response.data);
        setLandmarkArr(response.data.data);
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
      }
    }

    getCities();
  }, [searchParams]);
  return (
    <div className={css.AdminLandmarks}>
      <FilterBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
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
            const { _id: id, name, shortDesc, images } = item;
            return (
              <tr key={name}>
                <td>{name}</td>
                <td>{shortDesc}</td>
                <td>
                  <img src={images[0]?.url} />
                </td>
                <td>
                  <div className={cssTable.buttonBox}>
                    <button
                      onClick={() => {
                        console.log(name);
                      }}
                    >
                      <FaRegPenToSquare />
                    </button>{" "}
                    <button
                      onClick={() => {
                        console.log(name);
                        navigate(`/cities/${id}`);
                      }}
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      console.log(name);
                      navigate(`/cities/${id}`);
                    }}
                  >
                    Переглянути
                  </button>
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
