import * as Yup from 'yup';

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required')
    ,
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password'),
  confirmNewPassword: Yup.string()
    .required('Please confirm your new password')
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
});

export default changePasswordSchema;
