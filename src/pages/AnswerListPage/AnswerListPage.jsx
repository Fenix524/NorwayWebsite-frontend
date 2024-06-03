import css from "./AnswerListPage.module.css";
import FilterBar from "../../components/FilterBar/FilterBar";
import Title from "../../components/Title/Title";
import { Link, useSearchParams } from "react-router-dom";
import baseCss from "../../styles/base.module.css";
import Container from "../../components/Container/Container";
import CardSet from "../../components/CardSet/CardSet";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios/axios";
import { imgPathNormalize } from "../../utils/imgPathNormalize";

import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { formatDate } from "../../utils/dataFormater";
import Button from "../../components/Button/Button";
import MiniModal from "../../components/MiniModal/MiniModal";
import { askQuestion } from "../../utils/axios/questionsAxios";

const AnswerListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [questionsArr, setQuestionArr] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function getCities() {
      try {
        const params = {
          filter: {
            question: searchParams.get("search"),
            detailQuestion: searchParams.get("search"),
          },
          sort: {
            likesTotalCount: searchParams.get("sort") || -1,
            questionDate: searchParams.get("sort") || -1,
          },
        };

        const response = await axiosInstance.get("/questions", { params });
        console.log(response.data);
        setQuestionArr(response.data.data);
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
        // Додайте обробку помилок тут
      }
    }

    getCities();
  }, [searchParams]);

  const handleFormSubmit = (value) => {
    console.log(JSON.stringify(value));
    askQuestion(value).then((res) => {
      const newArr = [...questionsArr];
      newArr.push(res);
      setQuestionArr(newArr);
      setShowForm(false);
    });
  };

  if (!questionsArr) {
    return <div>Loading...</div>; // Покажіть що дані завантажуються
  }
  return (
    <main className={baseCss.mainWrapper}>
      <Container>
        <Title
          desc={
            "Задайте та переглядайте питання які можуть бути цікавими для вас, та отримайте відповідь!"
          }
        >
          Форум
        </Title>
        <div className={css.navBox}>
          <FilterBar
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <div className={css.askBtnWrapper}>
            <Button
              style="bordered"
              onClick={() => {
                console.log(1);
                setShowForm(true);
              }}
            >
              + Задати питання
            </Button>
            {showForm && (
              <MiniModal
                name={"question"}
                label={"Питання"}
                onSubmit={handleFormSubmit}
                onClose={() => {
                  setShowForm(false);
                }}
              />
            )}
          </div>
        </div>

        <div className={css.cardSetWrapper}>
          <CardSet>
            {questionsArr.map((question) => {
              console.log(question._id);
              return (
                <Link
                  to={"/answers/" + question._id}
                  className={css.questionCard}
                  key={question.id}
                >
                  <div className={css.top}>
                    <img
                      src={imgPathNormalize(question.askedBy?.avatarURL)}
                      alt="???"
                      className={css.userLogo}
                    />
                    <div className={css.userTextPart}>
                      <p className={css.userName}>{question.askedBy?.name}</p>
                      <p className={css.userEmail}>{question.askedBy?.email}</p>
                    </div>
                  </div>
                  <div className={css.bottom}>
                    <h3>{question.question}</h3>
                    <p className={css.detailQuestion}>
                      {question.detailQuestion}
                    </p>
                  </div>
                  <div className={css.statsContainer}>
                    <p className={css.date}>
                      {formatDate(question.questionDate)}
                    </p>
                    <p className={css.likes}>
                      <AiFillLike />
                      {question.likesTotalCount}
                    </p>
                  </div>
                </Link>
              );
            })}
          </CardSet>
        </div>
      </Container>
    </main>
  );
};

export default AnswerListPage;
