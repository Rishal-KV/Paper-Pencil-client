import { Student } from "../Interface/interfaces";
import axiosInstance from "./axiosInstance";
import { Course } from "../Interface/interfaces";

import { studentLogout } from "../Redux/slice/student";

axiosInstance.interceptors.request.use(
  (config) => {
    if (config && config.url && config?.url.startsWith("/student")) {
      const studentToken = localStorage.getItem("studentToken");
    

      if (studentToken) {
        config.headers["Authorization"] = `${studentToken}`;
      }
    }

    // Return the modified config
    return config;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);
export const setupInterceptors = (store: any) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error, "eeeo");

      if (
        error.response &&
        error.response.data &&
        error.response.data.role === "student" &&
        error.response.data.blocked === true
      ) {
        localStorage.removeItem("studentToken");
        store.dispatch(studentLogout()); // Dispatch action to remove student data
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

const studentAPi = {
  login: async (formdata: any) => {
    try {
      console.log(formdata, "fomr");

      let loginResponse = await axiosInstance.post(
        "/student/login_student/",
        formdata
      );
      return loginResponse;
    } catch (error) {
      throw error;
    }
  },
  fetchCourse: async (query1?: string, query2?: string, price?: string,page?:number) => {
    try {
      let category = query2;

      let fetchedCourse = await axiosInstance.get(
        `/student/get_course?search=${query1}&category=${category}&price=${price}&page=${page}`
      );

      return fetchedCourse;
    } catch (error) {
      throw error;
    }
  },
  signup: async (formdata: any) => {
    try {
      // Set up request headers with the token

      // Make the signup request with the headers
      let signupResponse = await axiosInstance.post(
        "/student/signup_student",
        formdata
      );

      return signupResponse;
    } catch (error) {
      throw error;
    }
  },

  confirmOtp: async (otp: any) => {
    try {
      const studentOtpToken = localStorage.getItem("studentOtpToken");

     

      const headers = {
        Authorization: `${studentOtpToken}`,
      };

      // Make the OTP confirmation request with the headers
      let otpResponse = await axiosInstance.post(
        "/student/verify_otp",
        { otp },
        { headers } // Pass the headers object
      );

      // Remove the student OTP token from localStorage after receiving the response
      localStorage.removeItem("studentOtpToken");

      return otpResponse;
    } catch (error) {
      throw error;
    }
  },
  googleAuth: async (data: any) => {
    try {
      let response = await axiosInstance.post("/student/google_login", data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (data: any) => {
    try {
      let response = await axiosInstance.post("/student/changepassword", data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  confirmForgotOrp: async (otp: number) => {
    try {
      const forgotPassToken = localStorage.getItem('forgPassToken');
        const headers = {
          Authorization: `${forgotPassToken}`,
        }
      const response = await axiosInstance.post("/student/forgot_confirm_otp", {
        otp,
      },{headers});
      return response;
    } catch (error) {
      throw error;
    }
  },

  setPassword: async (data: any) => {
    try {
      const forgotPassToken = localStorage.getItem("forgPassToken");
      const headers = {
        Authorization: `${forgotPassToken}`,
      };
      let response = axiosInstance.post("/student/setpassword", data, {
        headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchSpecificCourse: async (id: string) => {
    try {
      let response = await axiosInstance.get(
        `/student/getspecific_course?id=${id}`
      );
     

      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchChapter: async (id: string) => {
    try {
      let response = await axiosInstance.get(`/student/get_chapter?id=${id}`);

      return response;
    } catch (error) {
      throw error;
    }
  },
  get_studentProfile: async (studentId: string) => {
    try {
      let data = await axiosInstance.get(`/student/profile/${studentId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  update_profile: async (data: Student, studentId: string) => {
    try {
      let response = await axiosInstance.patch(
        `/student/profile/${studentId}`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateImage: async (data: File) => {
    try {
      
 console.log(data,"datata");
 
      let formData = new FormData();
      formData.append("image", data);

      const response = await axiosInstance.patch(
        "/student/update_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  stripePayment: async (course: Course | undefined,studentId:string) => {
    try {
      const response = await axiosInstance.post(
        "/student/stripe_payment",
      {course,studentId}
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  enroll: async (courseId: string | undefined, studentId: string) => {
    try {
      let response = await axiosInstance.post("/student/enroll", {
        courseId,
        studentId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  createChat: async (studentId: string, instructorId: string | undefined) => {
    try {
    

      const response = await axiosInstance.post("/student/create_chat", {
        studentId,
        instructorId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  checkEnroll: async (studentId: string, courseId: string) => {
    try {
      const response = await axiosInstance.get(
        `/student/enroll?studentId=${studentId}&courseId=${courseId}`
      );
      return response;
    } catch (error) {}
  },
  review: async (review: any, studentId: string) => {
    try {
      const response = await axiosInstance.post("/student/review", {
        review,
        studentId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  checkReview: async (courseId: string | undefined, studentId: string) => {
    try {
      // console.log(courseId + " " +  studentId + "####" );

      const response = await axiosInstance.get(
        `/student/check_review?courseId=${courseId}&studentId=${studentId}`
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
  getReview: async (courseId: string) => {
    console.log(courseId);

    try {
      const response = await axiosInstance.get(
        `/student/review?courseId=${courseId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  enrolledCourse: async (studentId: string | undefined) => {
    try {
      const response = await axiosInstance.get(
        `/student/enrolled_course?studentId=${studentId}`
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
  getCategory: async () => {
    try {
      const response = await axiosInstance.get("/student/category");
      return response;
    } catch (error) {}
  },
  saveProgress: async (
    studentId: string,
    courseId: string,
    lessonId: string | undefined
  ) => {
    try {
      await axiosInstance.post("/student/progress", {
        studentId,
        courseId,
        lessonId,
      });
    } catch (error) {
      throw error;
    }
  },
  checkProgress: async (courseId: string, studentId: string | undefined) => {
    try {
      const response = await axiosInstance.get(
        `/student/progress?studentId=${studentId}&courseId=${courseId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  getInstructor: async (courseId: string | undefined) => {
    try {
      const response = await axiosInstance.get(
        `/student/get_instructor?courseId=${courseId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getChatList: async (studentId: string) => {
    try {
      const response = await axiosInstance.get(
        `/student/get_chatlist?studentId=${studentId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getConversation: async (conversationId: string) => {
    try {
      const response = await axiosInstance.get(
        `/student/get_conversations?conversationId=${conversationId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addToFavourite: async (courseId: string, studentId: string) => {
    try {
      console.log(courseId, studentId + "hehen");

      const response = await axiosInstance.post("/student/favourite", {
        courseId,
        studentId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchFavourite: async (studentId: string) => {
    try {
      const response = await axiosInstance.get(
        `/student/favourite?studentId=${studentId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  answerToTheQuestion: async (
    questionId: string,
    answer: string,
    courseId: string,
    studentId: string
  ) => {
    try {
      const response = await axiosInstance.post("/student/answer", {
        questionId,
        answer,
        courseId,
        studentId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  generateCertificate: async (studentId: string, courseId: string) => {
    try {
      const response = await axiosInstance.get(
        `/student/download_certificate/${studentId}/${courseId}`,
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // Create a new Blob object using the response data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf"); // Specify the file name

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link from the document

      console.log(response, "ress");
    } catch (error) {
      console.error("Error downloading the certificate", error);
    }
  },
  saveCourseProgress: async (
    studentId: string,
    courseId: string,
    date: Date
  ) => {
    try {
      const response = await axiosInstance.post(
        "/student/save_courseprogress",
        {
          courseId,
          studentId,
          date,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  resend: async (forgot:boolean) => {
    try {
     
      let headers;
      if (forgot) {
        const forgotPassToken = localStorage.getItem('forgPassToken');
        headers = {
          Authorization: `${forgotPassToken}`,
        };
      }else{
        const studentOtpToken = localStorage.getItem("studentOtpToken");
         headers = {
          Authorization: `${studentOtpToken}`,
        };
      }
     

      const response = await axiosInstance.post("/student/resend_otp", {
        headers,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  invoice: async (studentId: string, courseId: string) => {
    try {
      const response = await axiosInstance.get(
        `/student/invoice?studentId=${studentId}&courseId=${courseId}`,
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // Create a new Blob object using the response data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf"); // Specify the file name

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link from the document

      console.log(response, "ress");
    } catch (error) {
      console.error("Error downloading the certificate", error);
    }
  },

  changePassword: async (
    email: string,
    password: string,
    newPassword: string
  ) => {
    try {
      const response = await axiosInstance.patch("/student/changepassword", {
        email,
        password,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default studentAPi;
