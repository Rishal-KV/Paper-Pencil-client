import instructorAPI from "../../API/instructor";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Instructor, InstructorType } from "../../Interface/interfaces";

import { PulseLoader } from "react-spinners";
import { toast } from "sonner";

import ProfileDetail from "./ProfileDetail";

function Profile() {
  const [instructorData, setInstructor] = useState<Instructor | null>(null);
  const instructor = useSelector((state: InstructorType) => state.instructor);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [load, setLoad] = useState<Boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setImage(file);
    }
  };

  const updateImage = async () => {
    if (!image) return;
    setLoad(true);
    try {
      const res = await instructorAPI.updateImage(image);
      if (res.data.status) {
        setPreview("");
        setImage(null);
        toast.success(res.data.message);
        // Re-fetch profile data to update image
        const profileRes = await instructorAPI.fetchProfile(instructor.instructor.email);
        setInstructor(profileRes.data);
      }
    } catch (error) {
      toast.error("Failed to update image");
    } finally {
      setLoad(false);
    }
  };

  const selectImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (!instructor?.instructor?.email) return;
    const fetchProfile = async () => {
      try {
        const res = await instructorAPI.fetchProfile(instructor.instructor.email);
        if (res.data) {
          setInstructor(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [instructor?.instructor?.email]);

  return (
    <div className="p-4 sm:ml-64 bg-white min-h-screen">
      <div className="p-4 rounded-lg dark:border-gray-700">
        <div className="flex items-center justify-center mb-4 rounded-lg bg-gray-5 shadow-md dark:bg-gray-800">
          <div className="p-6 sm:p-12 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="flex flex-col items-center ">
                <div className="avatar">
                  <div onClick={selectImage} className="w-24 rounded-xl">
                    <img
                      src={
                        preview
                          ? preview
                          : instructorData?.imageUrl
                          ? instructorData.imageUrl
                          : `https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1718777820~exp=1718781420~hmac=b33ee5bb43dd857c25f83aa75f49f17fa2c911b7a35ce91acefc0c6a4cd149b1&w=740`
                      }
                    />
                  </div>
                </div>
                {preview && (
                  <button
                    type="submit"
                    onClick={updateImage}
                    className={`mt-2 rounded-md ${
                      load ? "btn-disabled bg-gray-200 " : ""
                    } px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {load ? <PulseLoader size={10} /> : "Update"}
                  </button>
                )}
              </div>
              <input type="file" onChange={handleFileChange} hidden ref={inputRef} />
              <div className="flex flex-col">
                <h4 className="text-lg text-black font-semibold text-center md:text-left">
                  {instructorData?.name}
                </h4>
                <p className="text-black">
                  {instructorData?.about ? instructorData.about : "Please add a Bio"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ProfileDetail
          instructorData={instructorData as Instructor}
          setInstructor={setInstructor}
        />
      </div>
    </div>
  );
}

export default Profile;
