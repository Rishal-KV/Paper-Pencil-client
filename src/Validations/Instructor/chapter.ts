import * as yup from 'yup';

const chapterSchema = yup.object().shape({
  title: yup.string()
    .trim()
    .matches(/\S+/, 'Chapter name cannot be empty or consist solely of whitespace')
    .required('Chapter name is required'),
  description: yup.string()
    .trim()
    .matches(/\S+/, 'Description cannot be empty or consist solely of whitespace')
    .required('Description is required'),
  order: yup.number()
    .required('Order is required')
    .positive('Order must be positive')
    .integer('Order must be an integer')
});

export default chapterSchema;
