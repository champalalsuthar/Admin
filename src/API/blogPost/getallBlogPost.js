import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const getallBlogPost = async () => {
  const AuthToken = localStorage.getItem("AuthToken");
  try {
    const response = await axios.get(`${SITE_CONFIG.apiIPMongo}/admin/blogpost/getallblogposts`, {
      headers: {
        Authorization: `Bearer ${SITE_CONFIG.apiToken}`,
        AuthToken: AuthToken
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error to get blog post Data:", error);
    throw new Error(error.response.data.message || "An error occurred");
  }
};


