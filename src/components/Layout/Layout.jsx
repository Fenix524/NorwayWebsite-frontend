import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./Layout.module.css";
import Footer from "../Footer/Footer";

export const Layout = () => {
  return (
    <div className={css.wrapper}>
      <Header />
      <Suspense fallback={<Loader />}>
        <main className={css.main}>
          <Outlet />
        </main>
      </Suspense>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
};
