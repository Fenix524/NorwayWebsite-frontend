import FilterBar from "../../../components/FilterBar/FilterBar";
import css from "./AdminUsers.module.css";
import cssTable from "../../../styles/adminTable.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios/axios";

import { FaRegPenToSquare } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi";
import { imgPathNormalize } from "../../../utils/imgPathNormalize";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [usersArr, setUsersArr] = useState([]);

  useEffect(() => {
    async function getCities() {
      try {
        const params = {
          filter: {
            name: searchParams.get("search"),
            email: searchParams.get("search"),
          },
          sort: {
            name: searchParams.get("sort"),
          },
        };

        const response = await axiosInstance.get("/users", { params });
        console.log(response.data);
        setUsersArr(response.data.data);
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
        // Додайте обробку помилок тут
      }
    }

    getCities();
  }, [searchParams]);

  if (!usersArr) {
    return <div>Loading...</div>; // Покажіть що дані завантажуються
  }

  return (
    <div className={css.AdminUsers}>
      <FilterBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <table className={cssTable.table}>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Пошта</th>
            <th>Роль</th>
            <th>Зображення</th>
            <th></th> {/* Пустий заголовок для кнопки редагування */}
          </tr>
        </thead>
        <tbody>
          {usersArr.map((item) => {
            const { _id: id, name, email, role, avatarURL } = item;
            return (
              <tr key={name}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td>
                  <img src={imgPathNormalize(avatarURL)} />
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
