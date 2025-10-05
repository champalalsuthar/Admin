import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const fetchBlogPostById = async (id) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const response = await axios.post(
    `${SITE_CONFIG.apiIPMongo}/admin/blogpost/getblogpostbyid`,
    {
      _id: id,
    },
    {
      headers: {
        Authorization: `Bearer ${SITE_CONFIG.apiToken}`,
        AuthToken: AuthToken,
      },
    }
  );

  return response.data;
};
