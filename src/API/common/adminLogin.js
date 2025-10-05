import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const adminLogin = async (data) => {
  try {
    const response = await axios.post(
      `${SITE_CONFIG.apiIPMongo}/admin/user/login`,
      data,
      {
        headers: {
          Authorization: `Bearer ${SITE_CONFIG.apiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error to login:", error);
    throw new Error(error.response.data.message || "An error occurred");
  }
};
