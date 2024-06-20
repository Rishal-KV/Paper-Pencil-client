import * as yup from 'yup'

const editShema = yup.object().shape({
    name : yup.string().required()
})
export default editShema