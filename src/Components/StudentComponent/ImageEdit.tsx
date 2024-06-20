import { useFormik } from "formik";
import imageSchema from "../../Validations/Student/image";
import { useState } from "react";
import studentAPi from "../../API/studentAPI";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
function ImageEdit({ inputRef, click, profile, load, setLoad, name }: any) {
  const [response, setResponse] = useState<boolean>(false);
  const [preview, setPreview] = useState("");
  async function submit(data: any) {
    

    setResponse(true);
    let response = await studentAPi.updateImage(data);

    if (response.data.status) {
      setLoad(!load);
      setResponse(false);
      toast.success(response.data.message);
      setPreview("");
    }
  }

  const { handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: imageSchema,
    onSubmit: submit,
  });
  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setPreview(URL.createObjectURL(selectedFile));
      setFieldValue("image", selectedFile);
    }
  }
  const src = preview
    ? preview
    : profile && profile.profileImage
    ? profile.profileImage
    : `https://avatar.iran.liara.run/username?username=${name}`;
  return (
    <>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img onClick={click} src={src} alt="Avatar" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onBlur={handleBlur}
          onChange={handleImage}
          ref={inputRef}
          type="file"
          hidden
        />

        <div>
          {preview && (
            <button
              className={`mt-4 btn bg-blue-500 text-white ${
                response ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={response}
            >
              {response ? <PulseLoader color="#4169E1" /> : "Upload"}
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default ImageEdit;
