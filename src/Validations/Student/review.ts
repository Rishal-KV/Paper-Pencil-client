import * as yup from "yup";

const reviewValidation = yup.object().shape({
  review: yup.string()
    .trim() // Trim leading and trailing whitespace
    .matches(/\S+/, 'Review cannot consist solely of whitespace') // Ensures review is not empty or just spaces
    .required('Review is required'),
});

export default reviewValidation;
