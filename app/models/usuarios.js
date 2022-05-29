export default (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuarios", {
    //usuario_id: { type: Sequelize.UUID, primaryKey: true, autoIncrement: true },
    admin: {
      type: Sequelize.BOOLEAN
    },
    activo: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    fec_eliminacion: {
      type: Sequelize.DATE
    }
  }/*, { createdAt: "fec_insercion", updatedAt: "fec_modificacion" }*/);

  return Usuario;
};
