import * as Yup from "yup";

let imageSchema = Yup.object().shape({
  image: Yup.mixed().test("fileType", "Invalid file type", (value: any) => {
    if (!value) return true;
    const file = value as File;
    return ["image/jpeg", "image/png"].includes(file.type);
  }),
});
export default imageSchema;
