import axios from "axios";
import "dotenv/config.js";

// Obtener registros de países para carga inicial
export const getPaises = async () => {
  const getToken = async () => {
    const config = {
      method: "get",
      url: "https://www.universal-tutorial.com/api/getaccesstoken",
      headers: {
        "api-token": process.env.PAIS_TOKEN,
        "Accept": "application/json",
        "user-email": process.env.PAIS_EMAIL,
      },
    };
    const {data: response} = await axios(config);
    return response.auth_token;
  };

  const token = await getToken();
  const config = {
    method: "get",
    url: "https://www.universal-tutorial.com/api/countries/",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
  };
  const {data: response} = await axios(config);
  return response;
};
