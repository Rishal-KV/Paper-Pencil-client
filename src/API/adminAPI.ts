import axiosInstance from "./axiosInstance";
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the request is made to the instructorAPI
    
    
    if (config && config.url && config?.url.startsWith("/admin")) {
      const adminToken = localStorage.getItem("adminToken");
      

      if (adminToken) {
        config.headers["Authorization"] = `${adminToken}`;
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
const adminAPI = {
  login: async (formdata: any) => {
    try {
      let loginData = await axiosInstance.post("/admin/login", formdata);
      return loginData;
    } catch (error) {
      throw error;
    }
  },
  students: async (page:number) => {
    try {
      let studentResponse = await axiosInstance.get(`/admin/student_details?page=${page}`);
      return studentResponse;
    } catch (error) {
      throw error;
    }
  },
  studentAction: async (id: string) => {
    try {
      let actionResponse = await axiosInstance.patch("/admin/student_action", {
        id,
      });
      return actionResponse;
    } catch (error) {
      throw error;
    }
  },
  instructors: async (page:number) => {
    try {
      let instructors = await axiosInstance.get(`/admin/instructor_details?page=${page}`);
      return instructors;
    } catch (error) {
      throw error;
    }
  },
  instructorAction: async (id: string) => {
    try {
      let actionResponse = await axiosInstance.patch(
        "/admin/instructor_action",
        { id }
      );
      return actionResponse;
    } catch (error) {
      throw error;
    }
  },
  addCategory: async (category: any) => {
    try {
      console.log(category);

      let categoryResponse = await axiosInstance.post(
        "/admin/add_category",
        category
      );
      return categoryResponse;
    } catch (error) {
      throw error;
    }
  },
  getCategory: async () => {
    try {
      let category = await axiosInstance.get("/admin/get_category");
      return category;
    } catch (error) {
      throw error;
    }
  },
  categoryAction: async (id: string) => {
    try {
      let actionResponse = await axiosInstance.patch("/admin/action_category", {
        id,
      });
      return actionResponse;
    } catch (error) {
      throw error;
    }
  },
  fetchCourse: async (page:number) => {
    try {
      let response = await axiosInstance.get(`/admin/course?page=${page}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  courseAction: async (id: string) => {
    try {
      let response = await axiosInstance.patch("/admin/course", { id });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getChapter: async (id: string | undefined) => {
    try {
      let response = await axiosInstance.get(`/admin/chapter?id=${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  editCategory: async (details: any, id: string) => {
    try {
      details.id = id;

      const response = await axiosInstance.patch("/admin/edit_category",details);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getSpecific: async (id: string) => {
    try {
      const response = await axiosInstance.get(
        `/admin/specific_category?id=${id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchProfit:async() => {
    try {
      const response = await axiosInstance.get('/admin/profit');
      return response.data
    } catch (error) {
      throw error
    }
  }
};
export default adminAPI;
