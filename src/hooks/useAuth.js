import { useSelector } from "react-redux";
import {
  selectIsAuthorize,
  selectUser,
  selectIsRefreshing,
  selectUserRole,
} from "../redux/auth/auth.selectors";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsAuthorize);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const userRole = useSelector(selectUserRole);

  return {
    isRefreshing,
    isLoggedIn,
    user,
    userRole,
  };
};
