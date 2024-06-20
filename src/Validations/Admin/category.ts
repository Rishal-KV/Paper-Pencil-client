import  * as Yup from 'yup'
const categorySchema = Yup.object().shape({
    category : Yup.string().required().min(5)
})
export default categorySchema