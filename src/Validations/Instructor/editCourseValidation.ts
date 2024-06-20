import * as Yup from 'yup';

const editCourseValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    price: Yup.number()
        .min(0, 'Price must be a non-negative number')
        .required('Price is required'),
    description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),
    category: Yup.string()
        .required('Category is required')
});

export default editCourseValidationSchema;