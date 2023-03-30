/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const up = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkInsert("campanas",
      [
        {
          nombre: "Aprende las habilidades de tecnología más solicitadas por las empresas",
          descripcion: `Esta campaña se enfoca en atraer a personas que buscan mejorar sus habilidades laborales y destacar en el mercado laboral. 
          Incluye anuncios en línea que muestren ejemplos de habilidades tecnológicas que son importantes en el mundo laboral, así como testimonios de exalumnos que obtuvieron trabajos exitosos gracias a sus habilidades en programación y diseño gráfico.`,
          fec_inicio: new Date(2022, 1, 17, 7, 24, 0),
          fec_fin: new Date(2022, 11, 30, 23, 59, 59),
          usu_insercion: "admin",
          usu_modificacion: "admin",
          fec_insercion: new Date(2022, 1, 17, 7, 24, 0),
          fec_modificacion: new Date(2022, 11, 17, 9, 50, 0),
        },
        {
          nombre: "Ofertas exclusivas para la semana del Black Friday",
          descripcion: `Esta campaña se centra en ofrecer ofertas exclusivas para la semana del Black Friday. 
          Incluye anuncios en línea que muestren los cursos que están disponibles con descuento durante la semana del Black Friday y que solo estarán disponibles por un tiempo limitado. Se enfoca en cómo los estudiantes pueden aprovechar estas ofertas exclusivas para adquirir habilidades tecnológicas valiosas a precios más bajos.`,
          fec_inicio: new Date(2022, 11, 12, 0, 0, 0),
          fec_fin: new Date(2022, 11, 15, 23, 59, 59),
          usu_insercion: "admin",
          usu_modificacion: "admin",
          fec_insercion: new Date(2022, 10, 17, 7, 24, 0),
          fec_modificacion: new Date(2022, 10, 17, 9, 50, 0),
        },
        {
          nombre: "Invierte en tu futuro con descuentos en educación tecnológica",
          descripcion: `Esta campaña se enfoca en destacar la importancia de invertir en educación tecnológica para asegurar un futuro exitoso en el mercado laboral. 
          La campaña incluye anuncios en línea que muestren ejemplos de trabajos bien remunerados en el campo de la tecnología, así como testimonios de exalumnos que hayan logrado el éxito gracias a las habilidades que adquirieron en la institución educativa.`,
          fec_inicio: new Date(2023, 1, 6, 0, 0, 0),
          fec_fin: new Date(2023, 1, 15, 23, 59, 59),
          usu_insercion: "admin",
          usu_modificacion: "admin",
          fec_insercion: new Date(2022, 12, 31, 17, 8, 0),
          fec_modificacion: new Date(2022, 12, 31, 17, 8, 0),
        },
        {
          nombre: "Domina AutoCAD y lleva tus diseños al siguiente nivel",
          descripcion: `Esta campaña se enfoca en mostrar cómo AutoCAD puede mejorar la calidad de los diseños de los estudiantes y cómo los cursos ofrecidos por la institución pueden ayudar a los estudiantes a dominar el software. 
          La campaña incluye anuncios en línea con ejemplos de diseños realizados con AutoCAD, así como testimonios de exalumnos que hayan mejorado la calidad de sus diseños gracias a los cursos ofrecidos por la institución.`,
          fec_inicio: new Date(2023, 1, 6, 0, 0, 0),
          fec_fin: new Date(2023, 1, 15, 23, 59, 59),
          usu_insercion: "admin",
          usu_modificacion: "admin",
          fec_insercion: new Date(2022, 12, 31, 17, 8, 0),
          fec_modificacion: new Date(2022, 12, 31, 17, 8, 0),
        },
      ], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("campanas",
      {nombre: ["Aprende las habilidades de tecnología más solicitadas por las empresas", "Ofertas exclusivas para la semana del Black Friday",
        "Invierte en tu futuro con descuentos en educación tecnológica", "Domina AutoCAD y lleva tus diseños al siguiente nivel"]}, {});
};

export {up, down};
