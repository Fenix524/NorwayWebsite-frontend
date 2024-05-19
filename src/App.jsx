import "./App.css";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";

const Loader = lazy(() => import("./components/Loader/Loader"));

import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import AdminCities from "./pages/AdminPage/AdminCities/AdminCities";
import AdminUsers from "./pages/AdminPage/AdminUsers/AdminUsers";
import AdminLandmarks from "./pages/AdminPage/AdminLandmarks/AdminLandmarks";
import DetailPage from "./pages/DetailPage/DetailPage";
import { selectCityArr } from "./redux/cities/cities.selectors";
import { selectLandmarkArr } from "./redux/landmarks/landmarks.selectors";

const CitiesPage = lazy(() => import("./pages/CitiesPage/CitiesPage"));
const LandmarksPage = lazy(() => import("./pages/LandmarksPage/LandmarksPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="cities" element={<CitiesPage />} />
            <Route
              path="cities/:id"
              element={<DetailPage arraySelector={selectCityArr} />}
            />
            <Route path="landmarks" element={<LandmarksPage />} />
            <Route
              path="landmarks/:id"
              element={<DetailPage arraySelector={selectLandmarkArr} />}
            />
            <Route
              path="login"
              element={<RestrictedRoute redirectTo="/" component={LoginPage} />}
            />
            <Route
              path="signup"
              element={
                <RestrictedRoute redirectTo="/" component={SignupPage} />
              }
            />
            <Route
              path="profile"
              element={<PrivateRoute redirectTo="/" component={ProfilePage} />}
            />
            <Route
              path="admin"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={AdminPage}
                  userRoleProtect={"admin"}
                />
              }
            >
              <Route index element={<Navigate to="users" replace />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="cities" element={<AdminCities />} />
              <Route path="landmarks" element={<AdminLandmarks />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
