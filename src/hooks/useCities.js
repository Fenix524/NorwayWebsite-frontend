import { useSelector } from "react-redux";
import {
  selectCityArr,
  selectCitiesTotalAmount,
} from "../redux/cities/cities.selectors";

export const useCities = () => {
  const cityArr = useSelector(selectCityArr);
  const citiesTotalAmount = useSelector(selectCitiesTotalAmount);

  return {
    cityArr,
    citiesTotalAmount,
  };
};
