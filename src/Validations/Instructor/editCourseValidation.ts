import * as Yup from 'yup';

const editCourseValidationSchema = Yup.object().shape({
    name: Yup.string()
        .trim() // Trim leading and trailing whitespace
        .min(4, 'Name must be at least 4 characters')
        .matches(/\S+/, 'Name cannot be empty or consist solely of whitespace') // Ensures name is not empty or just spaces
        .required('Name is required'),
    price: Yup.number()
        .min(0, 'Price must be a non-negative number')
        .required('Price is required'),
    description: Yup.string()
        .trim() // Trim leading and trailing whitespace
        .min(10, 'Description must be at least 10 characters')
        .matches(/\S+/, 'Description cannot be empty or consist solely of whitespace') // Ensures description is not empty or just spaces
        .required('Description is required'),
    category: Yup.string()
        .trim() // Trim leading and trailing whitespace
        .matches(/\S+/, 'Category cannot be empty or consist solely of whitespace') // Ensures category is not empty or just spaces
        .required('Category is required')
});

export default editCourseValidationSchema;
