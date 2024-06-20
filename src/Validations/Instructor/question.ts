import  * as Yup from 'yup'
const validationSchema = Yup.object({
    question: Yup.string().required('Question is required'),
    options: Yup.array()
      .of(Yup.string().required('Option is required'))
      .min(4, 'At least 4 options are required')
      .max(4, 'Only 4 options are allowed'),
    correctOption: Yup.string().required('Correct option is required'),
  });

  export default validationSchema