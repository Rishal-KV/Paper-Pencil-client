import * as yup from 'yup';

const instructorSignUpSchema = yup.object().shape({
    name: yup.string()
        .trim() // Trim leading and trailing whitespace
        .matches(/^\S.*\S$/, 'Name cannot be empty or consist solely of whitespace') // Ensures name is not empty or just spaces
        .required('Name is required'),
    email: yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^\S.*\S$/, 'Password cannot be empty or consist solely of whitespace') // Ensures password is not empty or just spaces
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Ensure password contains at least one uppercase letter
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character') // Ensure password contains at least one special character
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required')
});

export default instructorSignUpSchema;
