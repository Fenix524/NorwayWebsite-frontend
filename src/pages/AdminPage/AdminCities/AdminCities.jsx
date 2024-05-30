import css from "./AdminCities.module.css";
import cssTable from "../../../styles/adminTable.module.css";
import FilterBar from "../../../components/FilterBar/FilterBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosInstance from "../../../utils/axios/axios";
import { HiOutlineTrash } from "react-icons/hi";
import { FaRegPenToSquare } from "react-icons/fa6";
import DetailPageModalForm from "../../../components/DetailPageModalForm/DetailPageModalForm";

const AdminCities = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [citiesArr, setCityArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState(null);

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

  const handleSave = (updatedData) => {
    console.log("Оновлені дані:", updatedData);
    // Тут можна додати логіку для збереження оновлених даних
  };

  if (!citiesArr) {
    return <div>Loading...</div>; // Покажіть що дані завантажуються
  }

  return (
    <div className={css.AdminCities}>
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
          {citiesArr.map((item) => {
            const { _id: id, name, shortDesc, images } = item;
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
                        setInitialData(
                          citiesArr.find((city) => city._id === id)
                        );
                        setShowModal(true);
                      }}
                    >
                      <FaRegPenToSquare />
                      {showModal && (
                        <DetailPageModalForm
                          show={showModal}
                          handleClose={() => setShowModal(false)}
                          initialData={initialData}
                          handleSave={handleSave}
                        />
                      )}
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

export default AdminCities;
