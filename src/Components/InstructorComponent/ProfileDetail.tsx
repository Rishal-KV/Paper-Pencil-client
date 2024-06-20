import { useFormik } from "formik";
import editSchema from "../../Validations/Instructor/edit";
import { Instructor, InstructorType } from "../../Interface/interfaces";
import instructorAPI from '../../API/instructor';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';


function ProfileDetail({ instructorData,setInstructor }: { instructorData?: Instructor,setInstructor?:(value:Instructor)=> void }) {
    const instructor = useSelector((state:InstructorType)=>state.instructor )
   
    const { errors, values, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            name: instructorData?.name || "",
            about: instructorData?.about || "",
            phone : instructorData?.phone || ""
        },
        validationSchema: editSchema,
        onSubmit: (instructorData:Instructor) => {
            instructorAPI.updateProfile(instructor.instructor._id as string, instructorData).then((res)=>{
                if (res.data.status) {
                   setInstructor && setInstructor(res.data.update)
                    toast.success(res.data.message)
                }
                
            })
        },
        enableReinitialize: true
    });

    return (
        <div className="bg-white shadow-lg p-5">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                        disabled
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.name && touched.name && (
                                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                        disabled
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone}
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.phone && touched.phone && (
                                        <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                    disabled
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.about}
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    ></textarea>
                                    {errors.about && touched.about && (
                                        <p className="mt-2 text-sm text-red-600">{errors.about}</p>
                                    )}
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Write a few sentences about yourself.
                                </p>
                            </div>

                           
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default ProfileDetail;
