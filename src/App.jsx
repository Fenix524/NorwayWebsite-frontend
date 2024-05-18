import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";

const Loader = lazy(() => import("./components/Loader/Loader"));

const CitiesPage = lazy(() => import("./pages/CitiesPage/CitiesPage"));
const LandmarksPage = lazy(() => import("./pages/LandmarksPage/LandmarksPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const ListPage = lazy(() => import("./pages/ListPage/ListPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="cities" element={<CitiesPage />} />
            <Route path="landmarks" element={<LandmarksPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
