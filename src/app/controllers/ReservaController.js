
const { password } = require('../../config/database');
const Yup = require("yup");

const Reserva = require('../models/Reserva');
class ReservaController{
    async index(req, res){
        const {user_id} = req.params;
        const userExists = await User.findOne({where: {user_id: user_id}});

        const user = await User.findByPk(userExists.id, {
            attributes: ['id', 'name'],
            include: {
                association: 'reserva',
                attributes: ["id", "data", "turma", "datashow", "horario"]
            },  
        });
       
        return res.json(user);
    }

    async store(req, res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            data: Yup.string().required(),
            turma: Yup.string().required(),
            datashow: Yup.string().required(),
            horario: Yup.date().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: 'Campos inválidos'});
        }
        
        /*const {user_id} = req.body;
        const userExists = await User.findOne({where: {user_id: user_id}}, {
            attributes: ["id", "name",]
        });

        if(!userExists){
            return res.status(401).json({msg: "Usuário não cadastrado!"});
        }
        */
        const { name, data, turma, datashow, horario } = req.body;
        const reserva = await Reserva.create({
            name: name,
            data: data,
            turma: turma,
            datashow: datashow,
            horario: horario,
        });

        return res.json(reserva);
    }

    async update(req, res){
        const schema = Yup.object().shape({
            mesPass: Yup.string().required(),
            mes: Yup.string().required().when("mesPass", (mesPass, field) => 
                mesPass ? field.required() : field
            ),
            confMes: Yup.string().when("mes", (mes, field) => 
            mes ? field.required().oneOf([Yup.ref("mes")]): field)
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({msg: "Campos inválidos"});
        }

        const lista = await Lista.findOne({where: {mes: req.body.mesPass} });

        console.log(lista)

        if(!lista){
            return res.status(400).json({msg: "Lista para o mês não existe!"});
        }

        const { id, mes  } = await lista.update(req.body);

        return res.status(200).json({id, mes});
    }

    async delete(req, res){
        const { lista_id } = req.params;
        const lista = await Lista.findByPk(lista_id);
        console.log(lista);
        if(!lista){
            return res.status(401).json({msg: "Lista não existe!"});
        }

        const { mes } = await lista.destroy();
        return res.status(200).json(mes);
    }
}

module.exports = new ReservaController();
