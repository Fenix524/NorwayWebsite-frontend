import { useEffect, useState } from "react";
import css from "./AnswerPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  answerQuestion,
  deleteAnswer,
  deleteQuestion,
  getOneQuestion,
  likeAnswer,
  likeQuestion,
  updateAnswer,
  updateQuestion,
} from "../../utils/axios/questionsAxios";
import baseCss from "../../styles/base.module.css";
import Title from "../../components/Title/Title";
import { imgPathNormalize } from "../../utils/imgPathNormalize";
import Container from "../../components/Container/Container";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/auth.selectors";
import { formatDate, likeStatusCalculate } from "../../utils/dataFormater";
import Button from "../../components/Button/Button";
import MiniModal from "../../components/MiniModal/MiniModal";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi";

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
      setThisItem(item);
    };

    fetchData();
  }, [id]);

  if (!thisItem) {
    return <div>Loading...</div>;
  }

  const handleFormSubmit = async (value) => {
    const res = await answerQuestion(thisItem._id, value);
    setThisItem(res);
    setShowForm(false);
  };

  const handleLikeQuestion = async () => {
    const res = await likeQuestion(thisItem._id);
    setThisItem(res);
  };

  const handleDeleteQuestion = async () => {
    await deleteQuestion(thisItem._id);
    navigate("/answers");
  };

  const handleEditQuestion = async (value) => {
    const newItem = await updateQuestion(thisItem._id, value);
    setThisItem({ ...thisItem, question: newItem.question });
    setShowFormAnswer(false);
  };

  const handleDeleteAnswer = async (answerId) => {
    await deleteAnswer(thisItem._id, answerId);

    thisItem.answers = thisItem.answers.filter(
      (answer) => answer._id !== answerId
    );

    setThisItem({ ...thisItem });
  };

  const handleEditAnswer = async (answerId, value) => {
    console.log(value);
    const newItem = await updateAnswer(thisItem._id, answerId, value);
    console.log(newItem);
    setThisItem({ ...thisItem, answers: newItem.answers });
    setShowFormAnswer(false);
  };

  const handleLikeAnswer = async (answerId) => {
    const res = await likeAnswer(thisItem._id, answerId);
    setThisItem(res);
  };

  const renderAnswer = (answer) => (
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
            <p className={css.userEmail}>{answer.answeredBy?.email}</p>
          </div>
        </div>
        <div className={css.statsBox}>
          <p className={css.likeCount}>{answer.likesTotalCount}</p>
          <button
            className={css.likeButton}
            onClick={() => handleLikeAnswer(answer._id)}
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
        <p className={css.answerDate}>{formatDate(answer.answerDate)}</p>
      </div>
      {console.log(answer)}
      {(currentUser._id === answer.answeredBy._id ||
        currentUser.role === "admin") && (
        <div className={css.changeQuestionsBox}>
          {/* <Button style="bordered" onClick={() => setShowFormAnswer(true)}>
            <FaRegPenToSquare />
            <p>Редагувати відповідь</p>
          </Button>
          {showFormAnswer && (
            <MiniModal
              name="answer"
              label="Відповідь"
              onSubmit={(value) => {
                handleEditAnswer(answer._id, value);
              }}
              onClose={() => setShowFormAnswer(false)}
            />
          )} */}
          <Button
            style="bordered"
            onClick={() => {
              handleDeleteAnswer(answer._id);
            }}
          >
            <HiOutlineTrash size={20} />
            <p>Видалити відповідь</p>
          </Button>
        </div>
      )}
    </div>
  );

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
                <button className={css.likeButton} onClick={handleLikeQuestion}>
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
              {(currentUser._id === thisItem.askedBy._id ||
                currentUser.role === "admin") && (
                <div className={css.changeQuestionsBox}>
                  <Button
                    style="bordered"
                    onClick={() => setShowFormAnswer(true)}
                  >
                    <FaRegPenToSquare /> <p>Редагувати питання</p>
                  </Button>
                  {showFormAnswer && (
                    <MiniModal
                      name="question"
                      label="Питання"
                      onSubmit={handleEditQuestion}
                      onClose={() => setShowFormAnswer(false)}
                    />
                  )}
                  <Button style="bordered" onClick={handleDeleteQuestion}>
                    <HiOutlineTrash size={20} /> <p>Видалити питання</p>
                  </Button>
                </div>
              )}
              <Button style="bordered" onClick={() => setShowForm(true)}>
                + Додати відповідь
              </Button>
              {showForm && (
                <MiniModal
                  name="answer"
                  label="Відповідь"
                  onSubmit={handleFormSubmit}
                  onClose={() => setShowForm(false)}
                />
              )}
            </div>
          </div>
        </Container>
      </section>
      <section className={css.answerSection}>
        <Container>{thisItem.answers.map(renderAnswer)}</Container>
      </section>
    </>
  );
};

export default AnswerPage;
