import * as Yup from 'yup';

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required')
    .matches(/^\S.*$/, 'Current password cannot be empty or only whitespace'),

  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password')
    .matches(/^\S.*$/, 'New password cannot be empty or only whitespace'),

  confirmNewPassword: Yup.string()
    .required('Please confirm your new password')
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .matches(/^\S.*$/, 'Confirm new password cannot be empty or only whitespace'),
});

export default changePasswordSchema;
