import css from "./AdminCities.module.css";
import cssTable from "../../../styles/adminTable.module.css";
import FilterBar from "../../../components/FilterBar/FilterBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosInstance from "../../../utils/axios/axios";
import { HiOutlineTrash } from "react-icons/hi";
import { FaRegPenToSquare } from "react-icons/fa6";
import DetailPageModalForm from "../../../components/DetailPageModalForm/DetailPageModalForm";
import { imgPathNormalize } from "../../../utils/imgPathNormalize";
import {
  createCity,
  deleteCity,
  updateCity,
} from "../../../utils/axios/cityAxios";
import Button from "../../../components/Button/Button";

const initialPageSteat = {
  name: "",
  shortDesc: "",
  pageType: "City",
  images: [],
  sections: [],
};

const AdminCities = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [citiesArr, setCityArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState(initialPageSteat);

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

        setCityArr(response.data.data);
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
        // Додайте обробку помилок тут
      }
    }

    getCities();
  }, [searchParams]);

  const createCityDoc = () => {
    // console.log("Оновлені дані:", updatedData);
    setInitialData(initialPageSteat);
    setShowModal(true);
    // Тут можна додати логіку для збереження оновлених даних
  };

  const onCreate = (newItem) => {
    const newArr = [...citiesArr, newItem]; // додаємо новий елемент до копії масиву
    setCityArr(newArr); // оновлюємо стан
    return newItem;
  };

  const onUpdate = (newItem) => {
    const itemIndex = citiesArr.findIndex((city) => city._id === newItem._id);
    const newArr = [...citiesArr]; // створюємо копію масиву
    newArr.splice(itemIndex, 1, newItem); // замінюємо елемент у копії масиву
    setCityArr(newArr); // оновлюємо стан
    return newItem;
  };

  if (!citiesArr) {
    return <div>Loading...</div>; // Покажіть що дані завантажуються
  }

  return (
    <div className={css.AdminCities}>
      <div className={css.navBox}>
        <FilterBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <div className={css.createBtnWrapper}>
          <Button style={"bordered"} onClick={createCityDoc}>
            Створити нове місто
          </Button>
        </div>
      </div>
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
                  <img src={imgPathNormalize(images[0]?.url)} />
                </td>
                <td>
                  <div className={cssTable.buttonBox}>
                    <button
                      onClick={() => {
                        setInitialData(
                          citiesArr.find((city) => {
                            return city._id === id;
                          })
                        );
                        setShowModal(true);
                      }}
                    >
                      <FaRegPenToSquare />
                    </button>
                    <button
                      onClick={async () => {
                        const removedCity = await deleteCity(id);
                        const newArr = citiesArr.filter(
                          (city) => city._id !== removedCity._id
                        );
                        setCityArr(newArr);
                      }}
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                  <button
                    onClick={() => {
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
      {showModal && (
        <DetailPageModalForm
          handleClose={() => setShowModal(false)}
          initialData={initialData}
          createPage={createCity}
          updatePage={updateCity}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default AdminCities;
