import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.NotFoundPage}>
      <p>404</p>
      <p>Ой, можливо ця сторінка не є дійсною!</p>
      <a href="Повернутися на головну?"></a>
    </div>
  );
};

export default NotFoundPage;
