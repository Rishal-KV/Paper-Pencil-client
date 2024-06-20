import * as Yup from "yup";

const editSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  about: Yup.string()
    .min(5, "About must be at least 5 characters long")
    .nullable()

});

export default editSchema;
