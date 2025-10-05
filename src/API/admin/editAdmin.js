import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const editAdmin = async (Data) => {
  const AuthToken = localStorage.getItem("AuthToken");
  try {
    const response = await axios.post(
      `${SITE_CONFIG.apiIPMongo}/admin/user/updateadmin`,
      Data,
      {
        headers: {
          Authorization: `Bearer ${SITE_CONFIG.apiToken}`,
          AuthToken: AuthToken
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error to Update admin Data:", error);
    throw new Error(error.response.data.message || "An error occurred");
  }
};
