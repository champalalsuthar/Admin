import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const addBlogPost = async (Data) => {
  const AuthToken = localStorage.getItem("AuthToken");
  try {
    const response = await axios.post(
      `${SITE_CONFIG.apiIPMongo}/admin/blogpost/addblogpost`,
      Data,
      {
        headers: {
          Authorization: `Bearer ${SITE_CONFIG.apiToken}`,
          AuthToken: AuthToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error to add blog post:", error);
    throw new Error(error.response.data.message || "An error occurred");
  }
};
