import * as yup from 'yup';

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  lesson: yup
    .mixed()
    .test('fileFormat', 'Invalid file format. Only video files are allowed.', function(value) {
      if (!value) return true;
      const allowedFormats = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];
      if (value instanceof File) {
        return allowedFormats.includes(value.type);
      }
      return false;
    })
    .required('Lesson file is required'),
});

export default validationSchema;
