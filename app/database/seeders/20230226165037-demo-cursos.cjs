/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const up = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkInsert("cursos",
      [
        {
          nombre: "Marketing Digital",
          descripcion: `Este Curso de Marketing Digital se enfoca a quienes deseen administrar la identidad digital de empresas, marcas, productos, servicios, personajes públicos, campañas políticas, fundaciones, a todos quienes deseen estar en contacto con sus fans, clientes o potenciales clientes. Internet se volvió un medio eficaz para llegar efectivamente al target adecuado y las empresas y emprendimientos necesitan profesionalizar sus estrategias de marketing y de comunicación digital. 
          Internet se volvió un medio eficaz para llegar efectivamente al target adecuado y las empresas y emprendimientos necesitan profesionalizar sus estrategias de marketing y de comunicación digital.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
        {
          nombre: "Adobe Photoshop",
          descripcion: `Adobe Photoshop CC, es utilizado generalmente por diseñadores gráficos, ilustradores y fotógrafos profesionales. Con él puedes realizar fotomontajes hiperrealistas, retoques fotográficos, creación de imágenes animadas y estáticas para la web, creación de interfaces web y apps, generar efectos 3D sorprendentes y exigentes diseños con calidad profesional. 
          Este curso totalmente práctico y actualizado, se orienta a todas aquellas personas que deseen profesionalizarse como diseñadores digitales con Adobe Photoshop para dominar así los conceptos claves que todo diseñador gráfico exitoso necesita conocer. Además, este curso permitirá adquirir fundamentos que facilitarán el aprendizaje de otras herramientas digitales de diseño como Illustrator, InDesign, etc.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
        {
          nombre: "Introducción a la Programación",
          descripcion: `Existen muchas razones válidas para animarse a ello, pero mencionamos dos: a) Porque te abrirá un mundo de nuevas posibilidades laborales, porque hoy día hay una necesidad enorme de profesionales programadores que no pueden ser cubiertas totalmente, y, b) Porque podrías desarrollar una habilidad muy valiosa que te ayudará a comprender mejor cómo funciona todo a tu alrededor, y pasar de ser un simple consumidor, a un cotizado desarrollador de nuevas tecnologías. 
          Ideamos especialmente para vos, este Curso de Introducción a la Programación, utilizando el lenguaje Python, porque es amigable, sencillo y su curva de aprendizaje es bastante rápida. Con Python en poco tiempo podrás codificar aplicaciones y sabrás crear interfaces gráficas para el usuario. 
          En este curso encontrarás las mejores técnicas y ejercicios para sumergirte en el apasionante mundo de la programación, rompiendo temores erróneos como el que “programar es complicado”.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
        {
          nombre: "Desarrollo Web",
          descripcion: `Con los smartphone, tablets y demás dispositivos móviles actuales con los que nos conectamos a internet, la web ya no es la misma y los estándares de diseño y desarrollo deben readaptarse para lograr construir sitios web desafiantes que sean modernos, atractivos, profesionales, útiles y por sobre todo rentables y que atraigan a los visitantes correctos.
           El Desarrollador Web es el profesional técnico que idea, lidera y ejecuta un proyecto web de forma estratégica y práctica en cada proceso del aspecto de la planificación, del diseño, estructuración y programación, basado en la usabilidad y utilidad de su sitio, y del buen funcionamiento del mismo, haciéndolo sostenible y escalable todo al mismo tiempo de su concepción.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
        {
          nombre: "Programación Web",
          descripcion: `Si deseas aprender de verdad y ser en un auténtico profesional de la 
          programación, tómate el tiempo de estudiar con nosotros y tendrás la oportunidad real de convertirte en un cotizado y auténtico Programador Web.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
        {
          nombre: "E-Commerce",
          descripcion: `WordPress es un sistema de gestión de contenido, y es el estándar más utilizado en todo el mundo para la creación de sitios webs sin la necesidad de escribir código. Según estimaciones del WordCamp, en 2019 habían más de 75.000.000 de proyectos web online utilizando esta tecnología. 
          WooCommerce por su lado, es una extensión de WordPress enfocada específicamente a la creación de tiendas en línea, y es el más popular, por su robustez, seguridad y simplicidad. 
          Ambas herramientas combinadas se traducen en un sitio web de tipo e-Commerce totalmente funcional, seguro y rápido.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
        {
          nombre: "Robótica Educativa y Scratch para docentes",
          descripcion: `El principal objetivo de este curso es facilitar al docente métodos, herramientas de cómo y cuándo integrar de la robótica y videojuegos educativos como 
          metodologías innovadoras y de alto impacto que, de acuerdo a su plan de clase, integre prácticas y lógicas de la cultura maker y distribuir en la educación habilidades que están asociadas al enfoque STEAM, un aprendizaje potenciado con tecnologías, competencias denominadas del siglo 21.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
        {
          nombre: "Desarrollador Android",
          descripcion: `El Curso de Desarrollador Android  podrás crear desde cero tus propias aplicaciones 
          para dispositivos móviles con Sistema Operativo Android partiendo de la base del Sistema Operativo, requerimientos, lenguajes, estructura, versiones, para luego programar y diseñar apps paso a paso con una metodología práctica utilizando Android Studio.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
        {
          nombre: "Capacitación y Preparación para la Certificación Oficial de Microsoft Excel MO-200",
          descripcion: `El curso de certificación internacional MS Excel, te brindará todo el conocimiento necesario
          para conocer esta poderosa herramienta, abarcando elementos importantes del estándar internacional.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
        {
          nombre: "Adobe Indesign",
          descripcion: `¡Consigue sacar el máximo partido a InDesign gracias a este curso! 
          El Curso de InDesign es totalmente práctico y se enfoca a todas aquellas personas que deseen profesionalizarse de forma exitosa como diseñadores editoriales y dominar así los conceptos claves de esta poderosa herramienta.`,
          usu_insercion: "admin",
          usu_modificacion: "admin",
        },
      ], {});
};

const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("cursos",
      {nombre: ["Marketing Digital", "Adobe Photoshop", "Introducción a la Programación",
        "Desarrollo Web", "Programación Web", "E-Commerce", "Robótica Educativa y Scratch para docentes", "Desarrollador Android",
        "Capacitación y Preparación para la Certificación Oficial de Microsoft Excel MO-200", "Adobe Indesign"]}, {});
};

export {up, down};
