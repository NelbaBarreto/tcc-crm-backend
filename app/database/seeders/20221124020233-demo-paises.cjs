/* eslint-disable camelcase */
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

/* eslint-disable require-jsdoc */
const up = async (queryInterface, _Sequelize) => {
  let paises = await getPaises();
  paises = paises.map((pais) => ({
    nombre: pais.country_name,
    nom_corto: pais.country_short_name,
    cod_telefono: pais.country_phone_code,
  }));

  await queryInterface.bulkInsert("paises", paises, {});
};

const down = async (queryInterface, _Sequelize) => {
  let paises = await getPaises();
  paises = paises.map((pais) => ({
    nom_corto: pais.country_short_name,
  }));
  await queryInterface.bulkDelete("paises",
      {nom_corto: paises}, {});
};

export {up, down};
