import * as yup from "yup";

let validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Ensure password contains at least one uppercase letter
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character") // Ensure password contains at least one special character
    .matches(/^\S.*\S$/, 'Password cannot be empty or consist solely of whitespace'), // Ensures password is not empty or just spaces
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Ensure password contains at least one uppercase letter
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character") // Ensure password contains at least one special character
    .matches(/^\S.*\S$/, 'Password cannot be empty or consist solely of whitespace'), // Ensures password is not empty or just spaces
});

export default validationSchema;
