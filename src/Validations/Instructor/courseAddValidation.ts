import * as Yup from 'yup';

// Supported image MIME types
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const courseValidationSchema = Yup.object().shape({
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
    image: Yup.mixed()
        .required('Image is required')
        .test('fileFormat', 'Unsupported Format', (value) => {
            if (value instanceof File) {
                return SUPPORTED_FORMATS.includes(value.type);
            }
            return false;
        }),
    category: Yup.string()
        .trim() // Trim leading and trailing whitespace
        .matches(/\S+/, 'Category cannot be empty or consist solely of whitespace') // Ensures category is not empty or just spaces
        .required('Category is required')
});

export default courseValidationSchema;
