import { useEffect, useState } from "react";
import css from "./AnswerPage.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  answerQuestion,
  deleteQuestion,
  getOneQuestion,
  likeAnswer,
  likeQuestion,
  updateQuestion,
} from "../../utils/axios/questionsAxios";
import baseCss from "../../styles/base.module.css";
import Title from "../../components/Title/Title";
import { imgPathNormalize } from "../../utils/imgPathNormalize";
import Container from "../../components/Container/Container";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/auth.selectors";
import { formatDate, likeStatusCalculate } from "../../utils/dataFormater";
import Button from "../../components/Button/Button";
import MiniModal from "../../components/MiniModal/MiniModal";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const AnswerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thisItem, setThisItem] = useState();
  const currentUser = useSelector(selectUser);
  const [showFormAnswer, setShowFormAnswer] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const item = await getOneQuestion(id);
      console.log(item);
      setThisItem(item);
    };

    fetchData();
  }, []);

  if (!thisItem) {
    return <div>Loading...</div>;
  }
  console.log(thisItem);
  const handleFormSubmit = (value) => {
    console.log(JSON.stringify(value));
    answerQuestion(thisItem._id, value).then((res) => {
      // const newItem = { ...thisItem };
      // newItem.answers.push(res);
      console.log("Відповіііііііііііідь", res);
      setThisItem(res);
      setShowForm(false);
    });
  };
  // const {}

  return (
    <>
      <section className={baseCss.mainWrapper}>
        <Container>
          <div className={css.titleContainer}>
            <div className={css.top}>
              <div className={css.userBox}>
                <img
                  src={imgPathNormalize(thisItem.askedBy?.avatarURL)}
                  alt="User logo"
                  className={css.userLogo}
                />
                <div className={css.userTextPart}>
                  <p className={css.userName}>{thisItem.askedBy?.name}</p>
                  <p className={css.userEmail}>{thisItem.askedBy?.email}</p>
                </div>
              </div>
              <div className={css.statsBox}>
                <p className={css.likeCount}>{thisItem.likesTotalCount}</p>
                <button
                  className={`${css.likeButton}`}
                  onClick={() => {
                    console.log({
                      questionId: thisItem._id,
                    });
                    likeQuestion(thisItem._id).then((res) => {
                      console.log(res);
                      setThisItem(res);
                    });
                  }}
                >
                  {likeStatusCalculate(thisItem.likes, currentUser._id) ? (
                    <AiFillLike size={30} />
                  ) : (
                    <AiOutlineLike size={30} />
                  )}
                </button>
              </div>
            </div>
            <div className={css.bot}>
              <Title>{thisItem.question}</Title>
              <p>{thisItem.detailQuestion}</p>
              <p className={css.questionDate}>
                {formatDate(thisItem.questionDate)}
              </p>
            </div>
            <div className={css.askBtnWrapper}>
              {currentUser._id === thisItem.askedBy._id && (
                <div className={css.changeQuestionsBox}>
                  <Button
                    style="bordered"
                    onClick={() => {
                      setShowFormAnswer(true);
                    }}
                  >
                    + Редагувати питання
                  </Button>
                  {showFormAnswer && (
                    <MiniModal
                      name={"question"}
                      label={"Питання"}
                      onSubmit={async (value) => {
                        console.log(value);
                        const newItem = await updateQuestion(
                          thisItem._id,
                          value
                        );
                        console.log({ newItem });
                        setThisItem({
                          ...thisItem,
                          question: newItem.question,
                        });
                        setShowFormAnswer(false);
                      }}
                      onClose={() => {
                        setShowFormAnswer(false);
                      }}
                    />
                  )}
                  <Button
                    style="bordered"
                    onClick={async () => {
                      console.log(thisItem._id);
                      await deleteQuestion(thisItem._id);
                      navigate("/answers");
                    }}
                  >
                    + Видалити питання
                  </Button>
                </div>
              )}
              <Button
                style="bordered"
                onClick={() => {
                  setShowForm(true);
                }}
              >
                + Додати відповідь
              </Button>
              {showForm && (
                <MiniModal
                  name={"answer"}
                  label={"Відповідь"}
                  onSubmit={handleFormSubmit}
                  onClose={() => {
                    setShowForm(false);
                  }}
                />
              )}
            </div>
          </div>
        </Container>
      </section>
      <section className={css.answerSection}>
        <Container>
          {thisItem.answers.map((answer) => {
            return (
              <div className={css.answerBox} key={answer._id}>
                <div className={css.top}>
                  <div className={css.userBox}>
                    <img
                      src={imgPathNormalize(answer.answeredBy?.avatarURL)}
                      alt="User logo"
                      className={css.userLogo}
                    />
                    <div className={css.userTextPart}>
                      <p className={css.userName}>{answer.answeredBy?.name}</p>
                      <p className={css.userEmail}>
                        {answer.answeredBy?.email}
                      </p>
                    </div>
                  </div>
                  <div className={css.statsBox}>
                    <p className={css.likeCount}>{answer.likesTotalCount}</p>
                    <button
                      className={`${css.likeButton}`}
                      onClick={() => {
                        console.log({
                          questionId: thisItem._id,
                          answerId: answer._id,
                        });
                        likeAnswer(thisItem._id, answer._id).then((res) => {
                          console.log(res);
                          setThisItem(res);
                        });
                      }}
                    >
                      {likeStatusCalculate(answer.likes, currentUser._id) ? (
                        <AiFillLike size={30} />
                      ) : (
                        <AiOutlineLike size={30} />
                      )}
                    </button>
                  </div>
                </div>
                <div className={css.answerBot}>
                  <p className={css.answerText}>{answer.answer}</p>
                  <p className={css.answerDate}>
                    {formatDate(answer.answerDate)}
                  </p>
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
};

export default AnswerPage;
