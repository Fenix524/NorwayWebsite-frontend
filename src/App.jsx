import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";

import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import AdminCities from "./pages/AdminPage/AdminCities/AdminCities";
import AdminUsers from "./pages/AdminPage/AdminUsers/AdminUsers";
import AdminLandmarks from "./pages/AdminPage/AdminLandmarks/AdminLandmarks";
import DetailPage from "./pages/DetailPage/DetailPage";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/auth.operations";
import { readAllCities } from "./redux/cities/cities.operations";
import { readAllLandmarks } from "./redux/landmarks/landmarks.operations";
import { selectIsRefreshing } from "./redux/auth/auth.selectors";

const CitiesPage = lazy(() => import("./pages/CitiesPage/CitiesPage"));
const LandmarksPage = lazy(() => import("./pages/LandmarksPage/LandmarksPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const AnswerListPage = lazy(() =>
  import("./pages/AnswerListPage/AnswerListPage")
);
const AnswerPage = lazy(() => import("./pages/AnswerPage/AnswerPage"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
    dispatch(readAllCities());
    dispatch(readAllLandmarks());
  }, []);

  const isRefreshing = useSelector(selectIsRefreshing);

  return (
    !isRefreshing && (
      <>
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="cities" element={<CitiesPage />} />
              <Route
                path="cities/:id"
                element={<DetailPage modelSelector="City" />}
              />
              <Route path="landmarks" element={<LandmarksPage />} />
              <Route
                path="landmarks/:id"
                element={<DetailPage modelSelector="Landmark" />}
              />
              <Route path="answers" element={<AnswerListPage />} />
              <Route path="answers/:id" element={<AnswerPage />} />
              <Route
                path="login"
                element={
                  <RestrictedRoute redirectTo="/" component={LoginPage} />
                }
              />
              <Route
                path="signup"
                element={
                  <RestrictedRoute redirectTo="/" component={SignupPage} />
                }
              />
              <Route
                path="profile"
                element={
                  <PrivateRoute redirectTo="/" component={ProfilePage} />
                }
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
    )
  );
}

export default App;
