const { Router } = require("express");

const ReservaController = require("./app/controllers/ReservaController");

const Reserva = require('./app/models/Reserva');

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ msg: "API Compras" });
});


routes.post("/reserva", ReservaController.store);
routes.get("/listaReserva", ReservaController.index);

//Test

routes.get("/reserva", async (req, res) => {
    const d = new Date("2023-11-13");
    const reserva = await Reserva.create({
        name: "Eduardo",
        data: d,
        turma: "Turma 4",
        datashow: "LG",
        horario: "14:50",
    });
   res.json(reserva);
});

module.exports = routes;