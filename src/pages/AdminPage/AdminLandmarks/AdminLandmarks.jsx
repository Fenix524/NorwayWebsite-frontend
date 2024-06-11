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
import {
  createLandmark,
  deleteLandmark,
  updateLandmark,
} from "../../../utils/axios/landmarkAxios";
import DetailPageModalForm from "../../../components/DetailPageModalForm/DetailPageModalForm";
import Button from "../../../components/Button/Button";

const initialPageSteat = {
  name: "",
  shortDesc: "",
  pageType: "Landmark",
  images: [],
  sections: [],
};

const AdminLandmarks = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [landmarkArr, setLandmarkArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState(initialPageSteat);

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

  const onCreate = (newItem) => {
    const newArr = [...landmarkArr, newItem];
    setLandmarkArr(newArr);
    return newItem;
  };

  const onUpdate = (newItem) => {
    const itemIndex = landmarkArr.findIndex(
      (landmark) => landmark._id === newItem._id
    );
    landmarkArr.splice(itemIndex, 1, newItem);
    setLandmarkArr([...landmarkArr]);
    return newItem;
  };

  const createCityDoc = () => {
    // console.log("Оновлені дані:", updatedData);
    setInitialData(initialPageSteat);
    setShowModal(true);
    // Тут можна додати логіку для збереження оновлених даних
  };

  if (!landmarkArr) {
    return <div>Loading...</div>; // Покажіть що дані завантажуються
  }

  return (
    <div className={css.AdminLandmarks}>
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
                        setInitialData(
                          landmarkArr.find((city) => {
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
                        const removedCity = await deleteLandmark(id);
                        const newArr = landmarkArr.filter(
                          (city) => city._id !== removedCity._id
                        );
                        setLandmarkArr(newArr);
                      }}
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      console.log(name);
                      navigate(`/landmarks/${id}`);
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
          createPage={createLandmark}
          updatePage={updateLandmark}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default AdminLandmarks;
