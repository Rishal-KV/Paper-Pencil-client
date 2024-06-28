import { Instructor } from "../Interface/interfaces";
import axiosInstance from "./axiosInstance";
import { Course } from "../Interface/interfaces";
import { Question } from "../Interface/interfaces";

axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the request is made to the instructorAPI

    if (config && config.url && config?.url.startsWith("/instructor")) {
      const instructorToken = localStorage.getItem("instructorToken");

      if (instructorToken) {
        config.headers["Authorization"] = `${instructorToken}`;
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.role == "instructor" &&
      error.response.data.blocked === true
    ) {
      localStorage.removeItem("instructorToken");
      window.location.href = "/instructor/login";
    }
    return Promise.reject(error);
  }
);

const instructorAPI = {
  login: async (data: any) => {
    try {
      let response = await axiosInstance.post("/instructor/login", data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  googleAuth: async (data: any) => {
    try {
      let response = await axiosInstance.post("/instructor/googleAuth", data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  confirm_otp: async (otp: any) => {
    try {
      const instructorToken = localStorage.getItem("instructorOtpToken");

      const headers = {
        Authorization: `${instructorToken}`,
        "Content-Type": "application/json", // Assuming JSON is the content type
      };

      // Make the POST request with headers
      let response = await axiosInstance.post(
        "/instructor/confirm_otp",
        {
          otp: otp,
        },
        {
          headers: headers,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  signUp: async (data: any) => {
    try {
      let response = await axiosInstance.post("/instructor/sign_up", data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  dashboard: async () => {
    try {
      let response = axiosInstance.get("/instructor/dashboard");
      return response;
    } catch (error) {
      throw error;
    }
  },
  getCourse: async (page?: number) => {
    try {
      let response = await axiosInstance.get(
        `/instructor/course_list?page=${page}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  addCourse: async (form: any) => {
    try {
      let { name, price, description, category, image } = form;

      let formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      let response = await axiosInstance.post(
        "/instructor/add_course",
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
  addChapter: async (chapter: any, id: any) => {
    try {
      let { title, order, description } = chapter;
      let response = await axiosInstance.post("/instructor/chapter", {
        title,
        order,
        id,
        description,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getChapters: async (id: string | undefined) => {
    try {
      let response = await axiosInstance.get(`/instructor/chapter?id=${id}`);
      console.log(response, "hehehehheheh");

      return response;
    } catch (error) {
      throw error;
    }
  },
  // addLesson: async (form: any, id: string) => {
  //   let { lesson, title } = form;
  //   console.log(lesson);
  //   console.log(id);

  //   try {
  //     let formData = new FormData();
  //     formData.append("id", id);
  //     formData.append("title", title);
  //     formData.append("video", lesson);
  //     let response = await axiosInstance.post("/instructor/lesson", formData);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  addLesson: async (form: any, id: string) => {
    let { lesson, title } = form;
    console.log(lesson);
    console.log(id);

    try {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("video", lesson); // assuming lesson is a File object

      let response = await axiosInstance.post("/instructor/lesson", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  publish: async (id: string) => {
    try {
      let response = await axiosInstance.patch("/instructor/publish", { id });
      return response;
    } catch (error) {
      throw error;
    }
  },
  list: async (id: string) => {
    try {
      let response = await axiosInstance.patch("/instructor/course_list", {
        id,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updateChapter: async (data: any) => {
    try {
      let response = await axiosInstance.patch("/instructor/chapter", data);

      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteLesson: async (lessonId: string, chapterId: string) => {
    console.log(chapterId);

    try {
      let response = await axiosInstance.delete(
        `/instructor/lesson?chapterId=${chapterId}&lessonId=${lessonId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchProfile: async (email: string | undefined) => {
    try {
      const response = await axiosInstance.get(
        `/instructor/profile?email=${email}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (
    instructorId: string | undefined,
    instructorData: Instructor
  ) => {
    try {
      const response = await axiosInstance.post("/instructor/profile", {
        instructorId,
        instructorData,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateImage: async (image: any) => {
    try {
      const formData = new FormData();

      formData.append("image", image);

      const response = await axiosInstance.patch(
        "/instructor/profile",
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

  resendOtp: async () => {
    try {
      const instructorToken = localStorage.getItem("instructorOtpToken");

      const headers = {
        Authorization: `${instructorToken}`,
        "Content-Type": "application/json", // Assuming JSON is the content type
      };
      const response = await axiosInstance.post("/instructor/resend_otp", {
        headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  getSpecificCourse: async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/instructor/course?id=${id}`);

      return response;
    } catch (error) {
      throw error;
    }
  },
  updateCOurse: async (
    courseId: string | undefined,
    courseData: Course | undefined
  ) => {
    console.log(courseData, "courseDataata");

    if (typeof courseData?.image != "string" && courseData?.image) {
      console.log("not string");

      const formData = new FormData();

      formData.append("name", courseData?.name as string);
      formData.append("price", courseData?.price as unknown as string);
      formData.append("description", courseData?.description as string);
      formData.append("category", courseData?.category as string);
      formData.append("image", courseData?.image as Blob);
      formData.append("courseId", courseId as string);
      const response = await axiosInstance.patch(
        "/instructor/update_course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    }

    try {
    } catch (error) {
      throw error;
    }
  },
  enrollments: async (id: string) => {
    try {
      const response = await axiosInstance.get(
        `/instructor/enrollments?courseId=${id}`
      );

      return response.data;
    } catch (error) {
      return error;
    }
  },

  profit: async (instructorId: string) => {
    try {
      const response = await axiosInstance.get(
        `/instructor/profit?instructorId=${instructorId}`
      );
      response.data;
    } catch (error) {
      throw error;
    }
  },
  get_chats: async (instructorId: string) => {
    try {
      const response = await axiosInstance.get(
        `/instructor/get_chat?instructorId=${instructorId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getConversation: async (conversationId: string) => {
    try {
      console.log(conversationId, "api");

      const response = await axiosInstance.get(
        `/instructor/get_conversations?conversationId=${conversationId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCategory: async () => {
    const response = await axiosInstance.get("/instructor/category");
    return response.data;
  },
  fetchProfit: async (instructorId: string) => {
    try {
      const response = await axiosInstance.get(
        `/instructor/profit?instructorId=${instructorId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  fetchSales: async (instructorId: string) => {
    try {
      const response = await axiosInstance.get(
        `/instructor/sales?instructorId=${instructorId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  addQuestion: async (question: Question) => {
    try {
      const response = await axiosInstance.post(
        "/instructor/question",
        question
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchQuestion: async (courseId: string) => {
    try {
      const response = await axiosInstance.get(
        `/instructor/question?courseId=${courseId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async (courseId: string, questionId: string) => {
    try {
      const response = await axiosInstance.delete(
        `/instructor/question?courseId=${courseId}&questionId=${questionId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchStudents: async (instructorId: string) => {
    try {
      const response = await axiosInstance.get(
        `/instructor/students?instructorId=${instructorId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (
    email: string,
    password: string,
    newPassword: string
  ) => {
    try {
      const response = await axiosInstance.patch("/instructor/change-password", {
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

export default instructorAPI;
