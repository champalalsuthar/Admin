import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const fetchAdminById = async (id) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const response = await axios.post(
    `${SITE_CONFIG.apiIPMongo}/admin/user/getadminbyid`,
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
