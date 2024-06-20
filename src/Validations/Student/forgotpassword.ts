import * as yup from 'yup';
let validationSchema = yup.object().shape({
    email:yup.string().email('invalid email format').required('email is required')
})
export default validationSchema;