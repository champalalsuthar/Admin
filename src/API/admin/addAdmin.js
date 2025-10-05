import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const addAdmin = async (Data) => {
  const AuthToken = localStorage.getItem("AuthToken");
  try {
    const response = await axios.post(
      `${SITE_CONFIG.apiIPMongo}/admin/user/addadmin`,
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
    console.error("Error to add admin:", error);
    throw new Error(error.response.data.message || "An error occurred");
  }
};
