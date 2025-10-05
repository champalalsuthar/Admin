import axios from "axios";
import SITE_CONFIG from "../../Controller/SiteController";

export const uplodadFile = async (file) => {
  const AuthToken = localStorage.getItem("AuthToken");

  const response = await axios.post(
    `${SITE_CONFIG.apiIPMongo}/api/add/upload`,
    file,
    {
      headers: {
        Authorization: `Bearer ${SITE_CONFIG.apiToken}`,
        AuthToken: AuthToken,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
