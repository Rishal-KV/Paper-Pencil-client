import * as yup from "yup";
const reviewValidation = yup.object().shape({
  review: yup.string().required(),
});

export default reviewValidation;
