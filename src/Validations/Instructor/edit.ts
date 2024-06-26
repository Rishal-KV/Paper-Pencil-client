import * as Yup from "yup";

const editSchema = Yup.object().shape({
  name: Yup.string()
    .trim() // Trim leading and trailing whitespace
    .matches(/\S+/, "Name cannot be empty or consist solely of whitespace") // Ensures name is not empty or just spaces
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
});

export default editSchema;
