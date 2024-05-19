import { useSelector } from "react-redux";
import {
  selectLandmarkArr,
  selectLandmarsTotalAmount,
} from "../redux/landmarks/landmarks.selectors";

export const useLandmarks = () => {
  const landmarkArr = useSelector(selectLandmarkArr);
  const landmarksTotalAmount = useSelector(selectLandmarsTotalAmount);

  return {
    landmarkArr,
    landmarksTotalAmount,
  };
};
