
import * as yup from 'yup';

const instructorSignUpSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required'),
    email: yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required')
});

export default instructorSignUpSchema;
