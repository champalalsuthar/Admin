import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const verifyToken = async (authToken, userid) => {
  const _id = userid
  try {
    const response = await axios.post(
      `${SITE_CONFIG.apiIPMongo}/admin/auth/verify`, {_id},
      {
        headers: {
          AuthToken: authToken,
          Authorization: `Bearer ${SITE_CONFIG.apiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error to login:", error);
    throw new Error(error.response.data.error || "An error occurred");
  }
};
