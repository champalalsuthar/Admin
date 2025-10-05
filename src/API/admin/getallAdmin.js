import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const getallAdmin = async () => {
  const AuthToken = localStorage.getItem("AuthToken");
  const response = await axios.get(`${SITE_CONFIG.apiIPMongo}/admin/user/getalladmin`, {
    headers: {
      Authorization: `Bearer ${SITE_CONFIG.apiToken}`,
      AuthToken: AuthToken,
    },
  });

  return response.data;
};
