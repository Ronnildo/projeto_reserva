const { Model } = require("sequelize");
const Sequelize = require("sequelize");

class Reserva extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        data: Sequelize.DATEONLY,
        turma: Sequelize.STRING,
        datashow: Sequelize.STRING,
        horario: Sequelize.STRING, 
        
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

module.exports = Reserva;