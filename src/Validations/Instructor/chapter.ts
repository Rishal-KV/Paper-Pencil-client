import * as yup from 'yup';

const chapterSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  order: yup.number().required('Order is required').positive('Order must be positive').integer('Order must be an integer')
});

export default chapterSchema;
